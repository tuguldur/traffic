const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "user", default: null },
  test: [{ type: mongoose.Schema.ObjectId, ref: "test", default: null }],
  answers: [{ type: mongoose.Schema.ObjectId, ref: "answer", default: null }],
  point: { type: Number, required: true, default: 0 },
  expires: { type: Date, required: true },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("exam", examSchema);
