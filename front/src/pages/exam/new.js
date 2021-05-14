import React, { useEffect, useState } from "react";
import { Link, Prompt } from "react-router-dom";
import axios from "axios";
import "./style.scss";
import moment from "moment";

import {
  Container,
  Paper,
  LinearProgress,
  Tooltip,
  Button,
  //   dialog
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

//component
import Test from "components/test";
const NewExam = () => {
  const [state, setState] = useState(null);
  const [seconds, setSeconds] = useState(1200);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmission] = useState(null);
  const [exam, setExam] = useState(null);
  const [result, setResult] = useState(false);
  const save = () => {
    setLoading(true);
    axios
      .post("/rest/exam/check/" + exam, { answers: submissions })
      .then((response) => {
        if (response.data.status) {
          setResult(response.data.point);
          setLoading(false);
        }
      });
  };
  useEffect(() => {
    if (seconds > 0 && !loading && result === false) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else if (seconds === 0 && state && result === false && !loading) {
      save();
    }
  });
  useEffect(() => {
    axios.get("/rest/exam/new").then((response) => {
      if (response.data.status) {
        setLoading(false);
        setSubmission(
          response.data.data.map((test) => ({ test: test._id, answer: null }))
        );
        setExam(response.data.exam);
        setState(response.data.data);
      }
    });
  }, []);
  return (
    <>
      <div className="exam" id="exam">
        <Container maxWidth="sm">
          <Paper>
            {loading ? <LinearProgress /> : null}
            <div className="paper-header">
              <h3>
                Шалгалтын тест{" "}
                <Tooltip title="Үлдсэн хугацаа">
                  <span style={{ color: seconds < 60 ? "red" : "" }}>
                    {moment().startOf("day").seconds(seconds).format("mm:ss")}
                  </span>
                </Tooltip>
              </h3>
              <div>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => save()}
                >
                  Дуусгах
                </Button>
              </div>
            </div>
          </Paper>
          {state
            ? state.map((test, index) => (
                <Test
                  {...test}
                  code={index + 1}
                  type="exam"
                  onClick={(answer) => {
                    var saved = submissions.map((el) =>
                      el.test === test._id
                        ? Object.assign({}, el, { answer })
                        : el
                    );

                    setSubmission(saved);
                  }}
                  key={test._id}
                />
              ))
            : null}
        </Container>
      </div>
      <Dialog open={seconds === 0 || result !== false ? true : false}>
        <DialogTitle>
          {result !== false && seconds > 0
            ? "Шалгалтын үр дүн."
            : "Шалгалтын хугацаа дууслаа."}
        </DialogTitle>
        <DialogContent>
          <>
            Нийт зөв хариулсан: {result}
            {result < 17 ? (
              <h2 style={{ color: "red" }}>
                {((result / 20) * 100).toFixed(1)}% Tэнцээгүй
              </h2>
            ) : (
              <h2 style={{ color: "#15f915" }}>
                {((result / 20) * 100).toFixed(1)}% Tэнцэсэн
              </h2>
            )}
          </>

          <DialogActions>
            <Button color="secondary" onClick={() => window.location.reload()}>
              Дахин эхлэх
            </Button>
            <Link to={"/exam/" + exam}>
              <Button color="primary">Дуусгах</Button>
            </Link>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Prompt
        when={result === false}
        message="Tа шалгалтаас гарахдаа итгэлтэй байна уу?"
      />
    </>
  );
};
export default NewExam;
