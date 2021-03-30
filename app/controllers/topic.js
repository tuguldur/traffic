const Topic = require("../models/topic");
const Test = require("../models/test");
const ObjectId = require("mongoose").Types.ObjectId;
exports.index = async (req, res) => {
  const { id: category } = req.params;
  // aggregator
  var agg = await Topic.aggregate([]).unwind("tests").exec();
  console.log(agg);
  if (ObjectId.isValid(category)) {
    return res.json({ status: true, data: await Topic.find({ category }) });
  } else return res.json({ status: false });
};
