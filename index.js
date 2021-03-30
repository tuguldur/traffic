const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
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

app.use("/rest", require("./app/routes"));
if (process.env.NODE_ENV == "production")
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname + "/front/build/index.html"))
  );

app.listen(process.env.PORT || 5000, "0.0.0.0", () =>
  console.log(`App running port ${process.env.PORT || 5000}`)
);
