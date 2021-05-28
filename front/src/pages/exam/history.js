import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  LinearProgress,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import moment from "moment";
import axios from "axios";

const ExamHistory = (props) => {
  const [state, setState] = useState(null);
  const [active, setActive] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("/rest/exam/history").then((response) => {
      if (response.data.status) {
        setLoading(false);
        setState(response.data.data);
      }
    });
  }, []);
  return (
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
                  key={exam._id}
                  expanded={active === exam._id}
                  onChange={() => setActive(exam._id)}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className="date">
                      {moment(exam.created).fromNow()}
                    </Typography>

                    {exam.point > 17 ? (
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
                    <Typography>hello world</Typography>
                  </AccordionDetails>
                </Accordion>
              ))
            : null}
        </div>
      </Container>
    </div>
  );
};
export default ExamHistory;
