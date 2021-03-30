const Test = require("../models/test");
const Topic = require("../models/topic");
const ObjectId = require("mongoose").Types.ObjectId;

exports.index = async (req, res) => {
  Test.find()
    .populate("topic")
    .exec((err, test) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ status: false });
      }
      return res.json({ status: true, data: test });
    });
};
exports.topic = async (req, res) => {
  const { topic } = req.params;
  if (ObjectId.isValid(topic)) {
    const data = await Test.find({ topic });
    return res.json({ status: true, data });
  } else return res.status(422).json({ status: false });
};
