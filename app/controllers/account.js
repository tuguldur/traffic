const User = require("../models/user");
const { validationResult } = require("express-validator");
exports.save = (req, res) => {
  const { name, phone } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, errors: errors.array() });
  } else {
    User.findByIdAndUpdate(req.user.id, { name, phone }).then(() =>
      res.json({ status: true })
    );
  }
};
