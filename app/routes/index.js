const express = require("express");
const router = express.Router();

router.use("/category", require("./category"));
router.use("/test", require("./test"));
router.use("/topic", require("./topic"));
router.use("/auth", require("./auth.js"));
router.use("/account", require("./account.js"));
module.exports = router;
