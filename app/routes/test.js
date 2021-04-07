const express = require("express");
const router = express.Router();
const test = require("../controllers/test");

router.get("/", test.index);
router.get("/:topic", test.topic);
router.post("/search/:id", test.search);
module.exports = router;
