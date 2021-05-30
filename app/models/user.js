const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String },
  facebook: { type: String, default: null },
  google: { type: String, default: null },
  avatar: { type: String, default: null },
  phone: { type: String, default: null },
  username: { type: String, default: null },
  created: { type: Date, default: Date.now },
});
module.exports = mongoose.model("user", userSchema);
