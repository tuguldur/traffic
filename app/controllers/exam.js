const Exam = require("../models/exam");
const Test = require("../models/test");
const Category = require("../models/category");
const Topic = require("../models/topic");
const Answer = require("../models/answer");
const Correct = require("../models/correct");
const mongoose = require("mongoose");
exports.index = async (req, res) => {
  return res.json({
    status: true,
    data: await Exam.find({ user: req.user.id }),
  });
};
exports.new = async (req, res) => {
  // Зөвхөн B ангиллын 20 дурын тест
  const category = await Category.findOne({ name: "B ангилал" }).select("_id");
  const topics = await Topic.find({ category: category._id }).select("_id");
  Test.aggregate(
    [
      {
        $match: {
          topic: {
            $in: topics.map((topic) => new mongoose.Types.ObjectId(topic._id)),
          },
        },
      },
      { $sample: { size: 20 } },
    ],
    async (err, data) => {
      if (err) {
        return res.json({ status: false });
      }
      const answers = await data.map(async (test) => ({
        ...test,
        answers: await Answer.find({ test: test._id }).select("answer"),
      }));

      Promise.all(answers).then(async (data) => {
        var exam = await Exam.create({
          user: req.user.id,
          test: data.map((test) => test._id),
          expires: new Date(
            new Date().setMinutes(new Date().getMinutes() + 20)
          ).toISOString(), // add 20mins
        });
        return res.json({ status: true, data, exam: exam._id });
      });
    }
  );
};
exports.check = (req, res) => {
  const { id } = req.params;
  const { answers } = req.body;
  Exam.findOne({
    _id: id,
    user: req.user._id,
    expires: { $gt: Date.now() },
  })
    .then((data) => {
      if (data) {
        data.answers = answers.map((answer) => answer.answer);
        var point = 0;
        var result = data.test.map(async (test, index) => {
          const correct = await Correct.findOne({ test: test._id }).populate(
            "answer"
          );
          point =
            answers[index].answer === null
              ? point + 0
              : correct.answer._id.toString() == answers[index].answer
              ? point + 1
              : point + 0;
          return correct;
        });
        Promise.all(result).then(() => {
          data.point = point;
          data.save(() => res.json({ status: true, point }));
        });
      } else res.json({ status: false, msg: "Хүчингүй шалгалт" });
    })
    .catch((err) => console.log(err));
};
exports.view = (req, res) => {
  const { id } = req.params;
  Exam.findOne({ _id: id, user: req.user._id }).then((data) => {
    if (data) {
      var answered = data.answers;
      var result = data.test.map(async (find, index) => {
        const test = await Test.findById(find);
        const answers = await Answer.find({ test: test._id }).select("answer");
        const correct = await Correct.findOne({ test: test._id }).populate(
          "answer"
        );
        return {
          ...test._doc,
          answers,
          correct,
          answered: answered[index],
        };
      });
      Promise.all(result).then((record) => {
        return res.json({ status: true, data: record, point: data.point });
      });
    } else return res.status(404).json({ status: false });
  });
};
exports.history = (req, res) => {
  Exam.find({ user: req.user.id })
    .sort({ created: -1 })
    .then((data) => {
      var result = data.map(async (per) => {
        var answered = per.answers;
        let points = Promise.all(
          per.test.map(async (find, index) => {
            const test = await Test.findById(find);
            const correct = await Correct.findOne({ test: test._id }).populate(
              "answer"
            );
            return {
              code: test.code,
              correct:
                answered[index] === null
                  ? false
                  : correct.answer._id.toString() == answered[index]
                  ? true
                  : false,
            };
          })
        );
        return { points: await points, test: per };
      });
      Promise.all(result).then((record) => {
        return res.json({ status: true, data: record });
      });
    });
};
exports.remove = (req, res) => {
  const { id } = req.params;
  Exam.find({ user: req.user.id, _id: id }).deleteOne().exec();
  return res.json({ status: true, id });
};
exports.log = (req, res) => {
  Exam.find({
    user: req.user.id,
    created: {
      $gt: new Date(new Date().getFullYear(), 0, 1),
      $lt: new Date(new Date().getFullYear(), 12, 0),
    },
  })
    .select("created")
    .then((data) => {
      return res.json({ status: true, data });
    });
};
