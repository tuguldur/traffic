const { check } = require("express-validator");
exports.settings = [
  check("name").isLength({ min: 5, max: 32 }).withMessage("Алдаатай талбар"),
  check("phone").isNumeric({ min: 6, max: 12 }).withMessage("Алдаатай талбар"),
];
