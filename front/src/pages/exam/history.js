import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  LinearProgress,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Divider,
  AccordionActions,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

import { ExpandMore, Done, Close } from "@material-ui/icons";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const ExamHistory = () => {
  const [state, setState] = useState(null);
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(true);
  const [remove, setRemove] = useState(false);
  const load = () => {
    setLoading(true);
    setState(null);
    axios.get("/rest/exam/history").then((response) => {
      if (response.data.status) {
        setLoading(false);
        setState(response.data.data);
      }
    });
  };
  useEffect(() => load(), []);
  return (
    <>
      <div className="history">
        <Container maxWidth="sm">
          <Paper>
            {loading ? <LinearProgress /> : null}
            <div className="paper-header">
              <h3>Шалгалтын түүх</h3>
            </div>
          </Paper>
          <div className="history-lists">
            {state
              ? state.map((exam) => (
                  <Accordion
                    key={exam.test._id}
                    expanded={active === exam.test._id}
                    onChange={() => setActive(exam.test._id)}
                  >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Typography className="date">
                        {moment(exam.test.created).fromNow()}
                      </Typography>

                      {exam.test.point > 17 ? (
                        <Typography
                          className="status"
                          style={{ color: "#15f915" }}
                        >
                          Tэнцсэн
                        </Typography>
                      ) : (
                        <Typography className="status" style={{ color: "red" }}>
                          Tэнцээгүй
                        </Typography>
                      )}
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="point-chip-container">
                        {exam.points.map((point, index) => (
                          <Chip
                            key={index}
                            variant="outlined"
                            color={point.correct ? "primary" : "secondary"}
                            size="small"
                            icon={point.correct ? <Done /> : <Close />}
                            label={index + 1 + ". " + point.code}
                          />
                        ))}
                      </div>
                    </AccordionDetails>
                    <Divider />
                    <AccordionActions>
                      <Button
                        size="small"
                        color="secondary"
                        onClick={() => setRemove(exam.test._id)}
                      >
                        Устгах
                      </Button>
                      <Link to={"/exam/" + exam.test._id}>
                        <Button size="small" color="primary">
                          Үзэх
                        </Button>
                      </Link>
                    </AccordionActions>
                  </Accordion>
                ))
              : null}
          </div>
        </Container>
      </div>
      <Dialog open={Boolean(remove)} onClose={() => setRemove(false)}>
        <DialogContent>Шалгалтын түүхийг устах уу?</DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              axios.delete("/rest/exam/" + remove);
              setRemove(false);
              load();
            }}
            color="secondary"
            autoFocus
            size="small"
          >
            Устгах
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ExamHistory;
