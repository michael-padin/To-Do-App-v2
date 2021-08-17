const express = require("express");
const Task = require("../models/task");
const Tasks = require("../models/home");
const List = require("../models/list");
const router = express.Router();

// RENDERING TASKS PAGE //
router.get("/tasks", (req, res) => {
  List.find({}, (err, foundLists) => {
    if (foundLists) {
      Tasks.find({}, (err, foundTasks) => {
        if (foundTasks) {
          Task.find({}, (err, foundTask) => {
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
  const task = new Tasks({ name: tasksItem });

  task.save();
  res.redirect("/tasks");
});

// DELETING ITEM IN TASKS PAGE
router.post("/deleteTasksItem", (req, res) => {
  const TaskscheckedItem = req.body.TaskscheckedItem;

  Tasks.findByIdAndRemove(TaskscheckedItem, (err) => {
    if (!err) {
      res.redirect("/tasks");
    }
  });
});

// DELETING HOME ITEM IN TASKS PAGE //
router.post("/deleteHomeTask", (req, res) => {
  const homeTask = req.body.homeTaskscheckedItem;
  Task.findByIdAndRemove(homeTask, (err) => {
    if (!err) {
      res.redirect("/tasks");
    }
  });
});

module.exports = router;
