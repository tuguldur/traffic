const express = require("express");
const router = express.Router();
const account = require("../controllers/account");
const check = require("../middleware/check");
const input = require("../middleware/input");

router.post("/", check, input.settings, account.save);

module.exports = router;
