const express = require("express");
const router = express.Router();
const Test = require("../models/testSchema");

const test1 = { title: "A", content: "aaaa" };
const test2 = { title: "B", content: "bbbb" };
const test3 = { title: "C", content: "cccc" };

router.get("/", (req, res) => {
  Test.find({}, (err, tests) => {
    if (tests.length === 0) {
      Test.insertMany([test1, test2, test3], (req, res) => {
        if (err) {
          console.log(err);
        }
      });
    }
    if (err) {
      console.log(err);
    } else {
      res.json(tests);
    }
  });
});

router.post("/", (req, res) => {
  const { title, content } = req.body;

  const test = new Test({
    title: title,
    content: content,
  });

  test.save();
});

router.patch("/", (req, res) => {
  const { id, title, content } = req.body;

  Test.findByIdAndUpdate(
    { _id: id },
    { title: title, content: content },
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
});

router.delete("/", (req, res) => {
  const { id } = req.body;

  Test.findByIdAndDelete({ _id: id }, function (err) {
    if (err) {
      console.log(err);
    }
  });
});

module.exports = router;
