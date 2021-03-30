const Category = require("../models/category");
const Topic = require("../models/topic");
const Test = require("../models/test");
const ObjectId = require("mongoose").Types.ObjectId;
exports.index = async (req, res) => {
  return res.json({ status: true, data: await Category.find() });
};
exports.topic = async (req, res) => {
  const { id: category } = req.params;
  // aggregator
  var count = await Test.aggregate([
    { $group: { _id: "$topic", count: { $sum: 1 } } },
  ]);
  if (ObjectId.isValid(category)) {
    return res.json({ status: true, data: await Topic.find({ category }) });
  } else return res.json({ status: false });
};
