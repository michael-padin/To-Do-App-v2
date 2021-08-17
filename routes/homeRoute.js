const express = require("express");
const Task = require("../models/home");
const List = require("../models/list");
const router = express.Router();

const tasks = [];

// RENDERING HOME PAGE //
router.get("/", (req, res) => {
  let date = new Date().toLocaleString("en-us", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  Task.insertMany(tasks, (err, inserted) => {
    if (inserted) {
      Task.find({}, (err, foundTasks) => {
        if (foundTasks) {
          List.find({}, (err, foundLists) => {
            if (foundLists) {
              res.render("home", {
                homeTitle: "Today",
                newTaskItem: foundTasks,
                lists: foundLists,
                date: date,
              });
            } else {
              console.log(err);
            }
          });
        } else {
          console.log(err);
        }
      });
    }
  });
});

// POSTING HOME PAGE //
router.post("/", (req, res) => {
  const taskInput = req.body.taskInput;
  const taskButton = req.body.taskButton;
  const task = new Task({ name: taskInput });

  if (taskButton === "Today") {
    task.save();
    res.redirect("/");
  } else {
    List.findOne({ name: taskButton }, (err, foundList) => {
      foundList.tasks.push(task);
      foundList.save();
      res.redirect("/lists/" + taskButton);
    });
  }
});

// DELETING ITEM IN HOME PAGE //
router.post("/delete", (req, res) => {
  const listName = req.body.listName;
  const checkedItem = req.body.checkedItem;

  if (listName === "Today") {
    Task.findByIdAndRemove(checkedItem, (err) => {
      if (!err) {
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { tasks: { _id: checkedItem } } },
      (err, foundList) => {
        if (foundList) {
          res.redirect("/lists/" + listName);
        }
      }
    );
  }
});

module.exports = router;
