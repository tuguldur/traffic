const mongoose = require("mongoose");
const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.ObjectId, ref: "category" },
});
module.exports = mongoose.model("topic", topicSchema);
