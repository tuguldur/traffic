const mongoose = require("mongoose");
const answerSchema = new mongoose.Schema({
  answer: { type: String },
  test: { type: mongoose.Schema.ObjectId, ref: "test", default: null },
});
module.exports = mongoose.model("answer", answerSchema);
