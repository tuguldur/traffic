const Topic = require("../models/topic");
const Test = require("../models/test");
const Answer = require("../models/answer");
const Correct = require("../models/correct");
const ObjectId = require("mongoose").Types.ObjectId;

exports.test = async (req, res) => {
  const { id: topic } = req.params;
  // sorry
  if (ObjectId.isValid(topic)) {
    const title = await Topic.findById(topic);
    Test.find({ topic }).then((data) => {
      let promises = data.map(async (mix) => {
        const answers = await Answer.find({ test: mix._id }).select("answer");
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
        res.json({ status: true, data: send, topic: title })
      );
    });
  } else return res.json({ status: false });
};
