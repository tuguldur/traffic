import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  document.body.classList.add("dark");
} else {
  document.body.classList.add("light");
}
window.matchMedia("(prefers-color-scheme: dark)").addListener(function (e) {
  document.body.removeAttribute("class");
  document.body.classList.add(e.matches ? "dark" : "light");
});
ReactDOM.render(<App />, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
