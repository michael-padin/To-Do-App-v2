const express = require("express");
const Home = require("../models/home");
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

  Home.insertMany(tasks, (err, inserted) => {
    if (inserted) {
      Home.find({}, undefined, { sort: {created_at: 'desc'} }, (err, foundTasks) => {
        if (foundTasks) {
          List.find({}, undefined, {sort: {created_at: 'desc'}}, (err, foundLists) => {
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
  const task = new Home({ name: taskInput });

  if (taskButton === "Today") {
    Home.findOne({ name: taskInput }, (err, foundTask) => {
      if (taskInput == "") {
        res.redirect("/");
      } else {
        task.save();
        res.redirect("/");
      }

      // if (!foundTask) {
      //   res.redirect("/");
      //   task.save();
      // } else {
      //   res.redirect("/");
      // }
    });
  } else {
    List.findOne({ name: taskButton }, undefined, {sort: {created_at: 'desc'}}, (err, foundList) => {
      if (taskInput == "") {
        res.redirect("/lists/" + taskButton);
      } else {
        foundList.tasks.unshift(task);
        foundList.save();
        res.redirect("/lists/" + taskButton);
      }
    });
  }
});

// DELETING ITEMS IN  CUSTOM LISTS AND HOME PAGE //
router.post("/delete", (req, res) => {
  const listName = req.body.listName;
  const checkedItem = req.body.checkedItem;

  if (listName === "Today") {
    Home.findByIdAndRemove(checkedItem, (err) => {
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
