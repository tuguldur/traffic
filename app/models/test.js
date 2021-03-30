const mongoose = require("mongoose");
const testSchema = new mongoose.Schema({
  topic: { type: mongoose.Schema.ObjectId, ref: "topic" },
  code: { type: String },
  question: { type: String, default: null },
  image: { type: String, default: null },
  description: { type: String },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("test", testSchema);
