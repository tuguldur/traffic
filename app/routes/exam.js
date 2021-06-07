const express = require("express");
const router = express.Router();
const exam = require("../controllers/exam");

const role = require("../middleware/role");
const check = require("../middleware/check");

router.get("/", check, exam.index);
router.delete("/:id", check, exam.remove);
router.get("/new", check, exam.new);
router.get("/history", check, exam.history);
router.post("/check/:id", check, exam.check);
router.get("/view/:id", check, exam.view);
router.get("/log", check, exam.log);
router.get("/list", check, role("admin"), exam.list);
module.exports = router;
