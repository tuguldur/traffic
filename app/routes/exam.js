const express = require("express");
const router = express.Router();
const exam = require("../controllers/exam");

const check = require("../middleware/check");

router.get("/", check, exam.index);
router.get("/new", check, exam.new);
router.post("/check/:id", check, exam.check);
router.get("/view/:id", check, exam.view);
module.exports = router;
