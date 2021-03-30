import React from "react";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import "./style.scss";
const Test = (props) => {
  const { type, code, question, description, image, answers, correct } = props;
  return (
    <Paper style={{ padding: 15, marginTop: 15 }} className="test">
      {image ? (
        <>
          <img
            className="test-image"
            src={require("assets/" + image).default}
            title={question}
          />
          <Divider />
        </>
      ) : null}
      <Typography variant="subtitle1" gutterBottom>
        {question}
      </Typography>
      {!type ? (
        <List>
          {answers.map((answer, index) => {
            return (
              <ListItem
                button
                key={answer._id}
                onClick={() => {
                  console.log(correct.answer.answer);
                }}
              >
                <ListItemText secondary={`${index + 1}. ${answer.answer}`} />
              </ListItem>
            );
          })}
        </List>
      ) : null}
    </Paper>
  );
};
export default Test;
