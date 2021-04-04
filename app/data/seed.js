const fs = require("fs");
const seeder = require("mongoose-seed");
const mongoose = require("mongoose");
require("dotenv").config();

// model
const Topic = require("../models/topic.js");
const Test = require("../models/test.js");
const Answer = require("../models/answer.js");
const Correct = require("../models/correct.js");
const Category = require("../models/category.js");
// data main
const tests = JSON.parse(fs.readFileSync("./app/data/main/test.json", "utf-8"));
const topics = JSON.parse(
  fs.readFileSync("./app/data/main/topic.json", "utf-8")
);
const answers = JSON.parse(
  fs.readFileSync("./app/data/main/answer.json", "utf-8")
);
const corrects = JSON.parse(
  fs.readFileSync("./app/data/main/correct.json", "utf-8")
);
// data sub
const sub_tests = JSON.parse(
  fs.readFileSync("./app/data/sub/cd_test.json", "utf-8")
);
const sub_topics = JSON.parse(
  fs.readFileSync("./app/data/sub/cd_topic.json", "utf-8")
);
const sub_answers = JSON.parse(
  fs.readFileSync("./app/data/sub/cd_answer.json", "utf-8")
);
const sub_corrects = JSON.parse(
  fs.readFileSync("./app/data/sub/cd_correct.json", "utf-8")
);
// clear models before insert
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));
seeder.setLogOutput(false);
const save_corrects = async () => {
  let tests_find = await Test.find();
  var saved_tests = tests_find.map((test, index) => ({
    ...test._doc,
    id: tests.concat(sub_tests)[index].id,
  }));
  let answers_find = await Answer.find();
  var saved_answers = answers_find.map((answer, index) => ({
    ...answer._doc,
    id: answers.concat(sub_answers)[index].id,
  }));
  var document = corrects.concat(sub_corrects).map((correct) => ({
    answer: saved_answers.find((mix) => mix.id == correct.answer_id)._id,
    test: saved_tests.find((mix) => mix.id == correct.test_id)._id,
  }));

  try {
    await Correct.insertMany(document);
    console.log("✅ Correct Answers saved");
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit();
  }
};
const save_answers = async () => {
  // seed answer
  Test.find().then(async (data) => {
    let save = data.map((test, index) => ({
      ...test._doc,
      id: tests.concat(sub_tests)[index].id,
    }));
    var document = answers.concat(sub_answers).map((answer) => {
      if (save.find((match) => match.id == answer.test_id))
        return {
          test: save.find((match) => match.id == answer.test_id)._id,
          answer: answer.answer,
        };
      else {
        return {
          answer: answer.answer,
        };
      }
    });
    try {
      await Answer.insertMany(document);
      console.log("✅ Answers saved");
      save_corrects();
    } catch (e) {
      console.log(e);
      process.exit();
    }
  });
};
const save_tests = async () => {
  const topic = await Topic.find();
  let document = topic.map((top, index) => ({
    ...top._doc,
    id: topics.concat(sub_topics)[index].id,
  }));
  var save = tests.concat(sub_tests).map((test) => ({
    topic: document.find((m) => m.id == test.topics_id)._id,
    code: test.code,
    question: test.questions,
    image: test.images,
    description: test.desc,
  }));
  try {
    await Test.insertMany(save);
    console.log("✅ Tests saved");
    save_answers();
  } catch (e) {
    console.log(e);
    process.exit();
  }
};
// insert functions
const save_category = async () => {
  try {
    await Category.insertMany([
      {
        name: "B ангилал",
      },
      {
        name: "C,D,E ангилал",
      },
    ]);
    console.log("✅ Categories saved");
  } catch (e) {
    console.log(e);
    process.exit();
  }
};
const save_topics = async () => {
  const main = await Category.findOne({ name: "B ангилал" });
  const sub = await Category.findOne({ name: "C,D,E ангилал" });
  var main_topic = topics.map((topic) => ({
    name: topic.topics_name,
    category: main._id,
  }));
  var sub_topic = sub_topics.map((topic) => ({
    name: topic.topics_name,
    category: sub._id,
  }));
  try {
    await Topic.insertMany(main_topic.concat(sub_topic));
    console.log("✅ Topics saved");
    save_tests();
  } catch (e) {
    console.log(e);
    process.exit();
  }
};

seeder.connect(process.env.MONGO, () => {
  // Load Mongoose models
  seeder.loadModels([
    "./app/models/category.js",
    "./app/models/topic.js",
    "./app/models/test.js",
    "./app/models/answer.js",
    "./app/models/correct.js",
  ]);

  seeder.clearModels(["category", "topic", "test", "answer", "correct"], () => {
    console.log("✅ Collections are clear!");
    save_category();
    save_topics();
  });
});
