import React, { useState, useEffect } from "react";
import { Container, Paper, LinearProgress } from "@material-ui/core";
import axios from "axios";
//component
import Test from "components/test";
const ExamView = (props) => {
  const { id } = props.match.params;
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [point, setPoint] = useState(false);
  useEffect(() => {
    axios.get("/rest/exam/view/" + id).then((response) => {
      if (response.data.status) {
        setLoading(false);
        setState(response.data.data);
        setPoint(response.data.point);
      }
    });
  }, [id]);
  return (
    <div className="view">
      <Container maxWidth="sm">
        <Paper>
          {loading ? <LinearProgress /> : null}
          <div className="paper-header">
            <h3>Шалгалтын үр дүн</h3>
            {point !== false ? (
              point > 17 ? (
                <h3 style={{ color: "#15f915" }}>Tэнцсэн</h3>
              ) : (
                <h3 style={{ color: "red" }}>Tэнцээгүй</h3>
              )
            ) : null}
          </div>
        </Paper>
        {state
          ? state.map((test) => <Test {...test} type="view" key={test._id} />)
          : null}
      </Container>
    </div>
  );
};
export default ExamView;
