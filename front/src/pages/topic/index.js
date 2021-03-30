import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Pagination from "@material-ui/lab/Pagination";

import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";

import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import axios from "axios";
import Test from "components/test";
const Topic = ({ match }) => {
  const { id } = match.params;
  const [state, setState] = useState(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    axios.get("/rest/topic/" + id).then((response) => {
      if (response.data.status) setState(response.data.data);
    });
  }, [id]);
  useEffect(() => {}, [active]);
  return (
    <div className="topic hero flex-center">
      <Container maxWidth="sm">
        <Paper>
          <div className="paper-header">
            <h3>Нэр томъёо ба тодорхойлолт</h3>
            <div>
              <Link to="/">
                <IconButton>
                  <Icon>close</Icon>
                </IconButton>
              </Link>
            </div>
          </div>
        </Paper>
        {state ? <Test {...state[active]} /> : null}
        <Paper style={{ padding: 15, marginTop: 15 }}>
          {state ? (
            <Pagination
              count={state.length}
              variant="outlined"
              shape="rounded"
              className="flex-center"
              onChange={(e, page) => setActive(page - 1)}
            />
          ) : (
            <div className="skeleton-loading">
              <Typography component="div" variant="h3">
                <Skeleton />
              </Typography>
            </div>
          )}
        </Paper>
      </Container>
    </div>
  );
};
export default Topic;
