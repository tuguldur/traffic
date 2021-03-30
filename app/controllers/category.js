const Category = require("../models/category");
exports.index = async (req, res) => {
  return res.json({ status: true, data: await Category.find() });
};
