const express = require("express");
const Task = require("../models/task");
const Home = require("../models/home");
const List = require("../models/list");
const router = express.Router();

// RENDERING TASKS PAGE //
router.get("/tasks", (req, res) => {
  List.find({}, (err, foundLists) => {
    if (foundLists) {
      Task.find({}, (err, foundTasks) => {
        if (foundTasks) {
          Home.find({}, (err, foundTask) => {
            if (foundTask) {
              List.find({}, (err, tasks) => {
                if (err) return hundleError(err);
                res.render("tasks", {
                  newTaskItem: foundTasks,
                  lists: foundLists,
                  tasks: foundTask,
                  listTask: tasks,
                });
              });
            }
          });
        }
      });
    }
  });
});

// POSTING TASKS PAGE
router.post("/tasksPage", (req, res) => {
  const tasksItem = req.body.tasksItem;
  const task = new Task({ name: tasksItem });

    if (tasksItem == '') {
      res.redirect("/tasks");
    } else {
      task.save();
      res.redirect("/tasks");
    }
});

// DELETING ITEM IN TASKS PAGE
router.post("/deleteTasksItem", (req, res) => {
  const TaskscheckedItem = req.body.TaskscheckedItem;

  Task.findByIdAndRemove(TaskscheckedItem, (err) => {
    if (!err) {
      res.redirect("/tasks");
    }
  });
});

// DELETING HOME ITEM IN TASKS PAGE //
router.post("/deleteHomeTask", (req, res) => {
  const homeTask = req.body.homeTaskscheckedItem;
  Home.findByIdAndRemove(homeTask, (err) => {
    if (!err) {
      res.redirect("/tasks");
    }
  });
});

module.exports = router;
