const express = require("express");
const router = express.Router();
const topic = require("../controllers/topic");

router.get("/", topic.index);
router.get("/:id", topic.test);
module.exports = router;
