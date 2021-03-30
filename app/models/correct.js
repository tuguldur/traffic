const mongoose = require("mongoose");
const correctSchema = new mongoose.Schema({
  answer: { type: mongoose.Schema.ObjectId, ref: "answer", default: null },
  test: { type: mongoose.Schema.ObjectId, ref: "test", default: null },
  created: { type: Date, default: Date.now },
});
module.exports = mongoose.model("correct", correctSchema);
