const mongoose = require("mongoose");
const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.ObjectId, ref: "category" },
  created: { type: Date, default: Date.now },
});
module.exports = mongoose.model("topic", topicSchema);
