const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String },
  facebook: { type: String, default: null },
  google: { type: String, default: null },
  avatar: { type: String, default: null },
  username: { type: String, default: null },
});
module.exports = mongoose.model("user", userSchema);
