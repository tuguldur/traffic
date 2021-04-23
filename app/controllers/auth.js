const User = require("../models/user");
exports.index = (req, res) => res.json({ user: req.user });
exports.facebook = (req, res) => {
  res.redirect(
    process.env.NODE_ENV === "development"
      ? `http://localhost:${process.env.CLIENT_PORT}`
      : "/"
  );
};
exports.google = (req, res) =>
  res.redirect(
    process.env.NODE_ENV === "development"
      ? `http://localhost:${process.env.CLIENT_PORT}`
      : "/"
  );
