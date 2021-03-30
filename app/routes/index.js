const express = require("express");
const router = express.Router();

router.use("/category", require("./category"));
router.use("/test", require("./test"));
router.use("/topic", require("./topic"));
module.exports = router;
