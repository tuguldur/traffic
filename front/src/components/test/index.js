import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Icon from "@material-ui/core/Icon";

import "./style.scss";
const Test = (props) => {
  const {
    type,
    code,
    question,
    description,
    image,
    answers,
    correct,
    onClick,
    answered,
  } = props;
  const [saved, setSaved] = useState(false);
  const [selected, setIndex] = useState(null);
  useEffect(() => {
    setSaved(false);
    setIndex(null);
  }, [question]);

  return (
    <Paper style={{ padding: 15, marginTop: 15 }} className="test">
      {image ? (
        <>
          <img
            className="test-image"
            src={require("assets/" + image).default}
            alt={`${code} ${question}`}
          />
          <Divider />
        </>
      ) : null}
      {saved && description ? (
        <>
          <Typography variant="body1" gutterBottom>
            Tайлбар:
          </Typography>
          <Typography variant="caption" gutterBottom>
            {description}
          </Typography>
          <Divider />
        </>
      ) : null}
      <Typography variant="subtitle1" gutterBottom>
        {code ? `${code}.` : null} {question}
      </Typography>
      {!type ? (
        <List>
          {answers.map((answer, index) => {
            return (
              <ListItem
                button
                key={answer._id}
                selected={selected === index}
                onClick={() => {
                  if (!saved) {
                    setSaved(answer._id);
                    setIndex(index);
                  }
                }}
              >
                <ListItemText secondary={`${index + 1}. ${answer.answer}`} />
                {saved ? (
                  answer._id === correct.answer._id ? (
                    <ListItemSecondaryAction>
                      <Icon style={{ color: "#0dbf0d" }}>done</Icon>
                    </ListItemSecondaryAction>
                  ) : answer._id === saved ? (
                    <ListItemSecondaryAction>
                      <Icon style={{ color: "red" }}>block</Icon>
                    </ListItemSecondaryAction>
                  ) : null
                ) : null}
              </ListItem>
            );
          })}
        </List>
      ) : type === "exam" ? (
        <List>
          {answers.map((answer, index) => {
            return (
              <ListItem
                button
                key={answer._id}
                selected={selected === index}
                className="exam-selection"
                onClick={() => {
                  setIndex(index);
                  onClick(answer._id);
                }}
              >
                <ListItemText secondary={`${index + 1}. ${answer.answer}`} />
              </ListItem>
            );
          })}
        </List>
      ) : type === "view" ? (
        <List>
          {answers.map((answer, index) => {
            return (
              <ListItem
                button
                key={answer._id}
                selected={answer._id === answered}
              >
                <ListItemText secondary={`${index + 1}. ${answer.answer}`} />
                {answer._id === correct.answer._id ? (
                  <ListItemSecondaryAction>
                    <Icon style={{ color: "#0dbf0d" }}>done</Icon>
                  </ListItemSecondaryAction>
                ) : answer._id === answered ? (
                  <ListItemSecondaryAction>
                    <Icon style={{ color: "red" }}>block</Icon>
                  </ListItemSecondaryAction>
                ) : null}
              </ListItem>
            );
          })}
        </List>
      ) : null}
    </Paper>
  );
};
export default Test;
