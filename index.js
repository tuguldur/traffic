const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookie = require("cookie-session");
const passport = require("passport");
const path = require("path");
require("dotenv").config();
require("./auth");
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/front/build")));
}
app.use(express.json());
app.use(
  cookie({
    name: "session",
    maxAge: 72 * 60 * 60 * 1000,
    httpOnly: false,
    keys: [process.env.COOKIE_SECRET],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/rest", require("./app/routes"));
if (process.env.NODE_ENV == "production")
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname + "/front/build/index.html"))
  );

app.listen(process.env.PORT || 5000, "0.0.0.0", () =>
  console.log(`App running port ${process.env.PORT || 5000}`)
);
