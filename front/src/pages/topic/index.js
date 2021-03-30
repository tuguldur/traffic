import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
// router
import { Link } from "react-router-dom";
import "./style.scss";
const Topic = () => {
  return (
    <div className="topic">
      <Container maxWidth="sm">
        <Paper>
          <div className="paper-header">
            <h3>Сэдвийн тест</h3>
            <div>
              <Link to="/">
                <IconButton aria-label="delete">
                  <Icon>close</Icon>
                </IconButton>
              </Link>
            </div>
          </div>
        </Paper>
      </Container>
    </div>
  );
};
export default Topic;
