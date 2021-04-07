import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";

import Snackbar from "@material-ui/core/Snackbar";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// router
import { Link } from "react-router-dom";
import "./style.scss";
// fetch
import axios from "axios";
const Category = ({ match }) => {
  const { id } = match.params;
  const online = window.navigator.onLine;
  const [state, setState] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (online)
      axios.get("/rest/topic").then((response) => {
        if (response.data.status) {
          setState(response.data.data);
        }
      });
    else setError(true);
  }, [id, online]);
  return (
    <div className="topic">
      <Snackbar
        open={error}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={() => console.log("ok hide")}
        message="Интернэт холболтоо шалгана уу."
      />
      <Container maxWidth="md">
        <Paper>
          <div className="paper-header">
            <h3>Сэдвийн тест</h3>
            <div>
              <Link to={`/search/${id}`}>
                <IconButton>
                  <Icon>search</Icon>
                </IconButton>
              </Link>
              <Link to="/">
                <IconButton aria-label="delete">
                  <Icon>close</Icon>
                </IconButton>
              </Link>
            </div>
          </div>
          <Divider />
          {state ? (
            <List>
              {state
                .filter((topic) => topic.category === id)
                .map((topic, index) => {
                  return (
                    <Link to={`/topic/${topic._id}`} key={topic._id}>
                      <ListItem button>
                        <ListItemText primary={`${index + 1}. ${topic.name}`} />
                      </ListItem>
                    </Link>
                  );
                })}
            </List>
          ) : (
            <div className="skeleton-loading">
              <Typography component="div" variant="h3">
                <Skeleton />
              </Typography>
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
export default Category;
