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
const test = fs.readFileSync("./app/data/main/test.json");
const topic = fs.readFileSync("./app/data/main/topic.json");
const answer = fs.readFileSync("./app/data/main/answer.json");
const correct = fs.readFileSync("./app/data/main/correct.json");
// data sub
const sub_test = fs.readFileSync("./app/data/sub/cd_test.json");
const sub_topic = fs.readFileSync("./app/data/sub/cd_topic.json");
const sub_answer = fs.readFileSync("./app/data/sub/cd_answer.json");
const sub_correct = fs.readFileSync("./app/data/sub/cd_correct.json");
seeder.setLogOutput(false);
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));
// console.log(JSON.parse(topic));

seeder.connect(process.env.MONGO, () => {
  // Load Mongoose models
  seeder.loadModels([
    "./app/models/category.js",
    "./app/models/topic.js",
    "./app/models/test.js",
    "./app/models/answer.js",
    "./app/models/correct.js",
  ]);

  // Clear specified collections
  seeder.clearModels(
    ["category", "topic", "test", "answer", "correct"],
    async () => {
      // seed category
      seeder.populateModels(
        [
          {
            model: "category",
            documents: [
              {
                name: "B ангилал",
              },
              {
                name: "C,D,E ангилал",
              },
            ],
          },
        ],
        () => {
          console.log("✅ Category saved");
        }
      );
      // seed topic
      const catMain = await Category.findOne({ name: "B ангилал" });
      const subMain = await Category.findOne({ name: "C,D,E ангилал" });
      var mainTopic = JSON.parse(topic).map((t) => {
        return { name: t.topics_name, category: catMain._id };
      });
      var subTopic = JSON.parse(sub_topic).map((t) => {
        return { name: t.topics_name, category: subMain._id };
      });
      seeder.populateModels(
        [
          {
            model: "topic",
            documents: mainTopic.concat(subTopic),
          },
        ],
        async () => {
          console.log("✅ Topics saved");
          // seed test
          let topics = await Topic.find();
          var mixedTopic = topics.map((top, index) => {
            return {
              ...top._doc,
              id: JSON.parse(topic).concat(JSON.parse(sub_topic))[index].id,
            };
          });

          seeder.populateModels(
            [
              {
                model: "test",
                documents: JSON.parse(test)
                  .concat(JSON.parse(sub_test))
                  .map((te) => {
                    return {
                      topic: mixedTopic.find((m) => m.id == te.topics_id)._id,
                      code: te.code,
                      question: te.questions,
                      image: te.images,
                      description: te.desc,
                    };
                  }),
              },
            ],
            async () => {
              console.log("✅ Tests saved");
              // seed answer
              let tests = await Test.find();
              var mixedTests = tests.map((ans, index) => {
                return {
                  ...ans._doc,
                  id: JSON.parse(test).concat(JSON.parse(sub_test))[index].id,
                };
              });

              seeder.populateModels(
                [
                  {
                    model: "answer",
                    documents: JSON.parse(answer)
                      .concat(JSON.parse(sub_answer))
                      .map((ans) => {
                        if (mixedTests.find((m) => m.id == ans.test_id))
                          return {
                            test: mixedTests.find((m) => m.id == ans.test_id)
                              ._id,
                            answer: ans.answer,
                          };
                        else {
                          return {
                            answer: ans.answer,
                          };
                        }
                      }),
                  },
                ],
                async () => {
                  // seed correct anwsers
                  console.log("✅ Answers saved");
                  let answers = await Answer.find();
                  var mixedAnswers = answers.map((ans, index) => {
                    return {
                      ...ans._doc,
                      id: JSON.parse(answer).concat(JSON.parse(sub_answer))[
                        index
                      ].id,
                    };
                  });
                  seeder.populateModels(
                    [
                      {
                        model: "correct",
                        documents: JSON.parse(correct)
                          .concat(JSON.parse(sub_correct))
                          .map((a) => {
                            return {
                              answer: mixedAnswers.find(
                                (mix) => mix.id == a.answer_id
                              )._id,
                              test: mixedTests.find(
                                (mix) => mix.id == a.test_id
                              )._id,
                            };
                          }),
                      },
                    ],
                    () => {
                      console.log("✅ Correct Answers saved");
                      seeder.disconnect();
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});
