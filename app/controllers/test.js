const Topic = require("../models/topic");
const Test = require("../models/test");
const Answer = require("../models/answer");
const Correct = require("../models/correct");
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
exports.search = (req, res) => {
  const { id } = req.params;
  const { search } = req.body;
  if (ObjectId.isValid(id)) {
    Topic.find({ category: id }).then((category) => {
      var topic_ids = category.map((cat) => cat._id);
      Test.find({ code: search, topic: { $in: topic_ids } }).then((data) => {
        if (data.length) {
          let promises = data.map(async (mix) => {
            const answers = await Answer.find({ test: mix._id }).select(
              "answer"
            );
            const correct = await Correct.findOne({ test: mix._id }).populate(
              "answer"
            );
            return {
              ...mix._doc,
              answers,
              correct,
            };
          });
          Promise.all(promises).then((send) =>
            res.json({ status: true, data: send })
          );
        } else return res.json({ status: true, data: [] });
      });
    });
  } else return res.json({ status: false, msg: "Алдаатай сэдвийн ID байна." });
};
