const mongoose = require("mongoose");
const answerSchema = new mongoose.Schema({
  answer: { type: String },
  test: { type: mongoose.Schema.ObjectId, ref: "test", default: null },
  created: { type: Date, default: Date.now },
});
module.exports = mongoose.model("answer", answerSchema);
