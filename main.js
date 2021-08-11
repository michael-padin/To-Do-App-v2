//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const _ = require("lodash");
const Task = require("./models/task");
const List = require("./models/list");
const Important = require("./models/importantPage");
const Tasks = require("./models/tasksPage");
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  "mongodb://localhost:27017/mytodolistDB",
  {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

const tasks = [];

// HOME PAGE
app.get("/", (req, res) => {

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

app.post("/", (req, res) => {
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

app.post("/delete", (req, res) => {
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

// IMPORTANT PAGE
app.get("/importantPage", (req, res) => {
  List.find({}, (err, foundLists) => {
    if (foundLists) {
      Important.find({}, (err, foundTasks) => {
        if (foundTasks) {
          res.render("importantPage", {
            newTaskItem: foundTasks,
            lists: foundLists,
          });
        }
      });
    } else {
      console.log(err);
    }
  });
});

app.post("/importantPage", (req, res) => {
  const ImportantTaskInput = req.body.ImportantTaskInput;
  const task = new Important({ name: ImportantTaskInput });

  task.save();
  res.redirect("/importantPage");
});

app.post("/deleteImportantTasks", (req, res) => {
  const importantTask = req.body.importantcheckedItem;

  Important.findByIdAndRemove(importantTask, (err) => {
    if (!err) {
      res.redirect("/importantPage");
    }
  });
});

// TASKS PAGE
app.get("/tasksPage", (req, res) => {
  List.find({}, (err, foundLists) => {
    if (foundLists) {
      Tasks.find({}, (err, foundTasks) => {
        if (foundTasks) {
          res.render("tasksPage", {
            newTaskItem: foundTasks,
            lists: foundLists,
          });
        }
      });
    } else {
      console.log(err);
    }
  });
});

app.post("/tasksPage", (req, res) => {
  const tasksItem = req.body.tasksItem;
  const task = new Tasks({ name: tasksItem });

  task.save();
  res.redirect("/tasksPage");
});

app.post("/deleteImportantTasks", (req, res) => {
  const TaskscheckedItem = req.body.TaskscheckedItem;

  Tasks.findByIdAndRemove(TaskscheckedItem, (err) => {
    if (!err) {
      res.redirect("/importantPage");
    }
  });
});

app.get("/lists/:customListName", (req, res) => {
  const customListName = req.params.customListName;
  List.findOne({ name: customListName }, (err, foundList) => {
    if (!err) {
      if (!foundList) {
        const newList = new List({ name: customListName, tasks: tasks });
        newList.save();
        res.redirect("/" + customListName);
      } else {
        List.find({}, (err, allLists) => {
          if (allLists) {
            res.render("list", {
              homeTitle: foundList.name,
              newTaskItem: foundList.tasks,
              lists: allLists,
            });
          }
        });
      }
    }
  });
});

// const customListSchema = {
//   name: [{ type: String, required: true, unique: true }],
// };
// const CustomList = mongoose.model("CustomList", customListSchema);

app.post("/lists", (req, res) => {
  const newLists = _.capitalize(req.body.newList);
  const lists = new List({ name: newLists });

  lists.save();
  res.redirect("/lists/" + newLists);
});

app.post("/deleteList", (req, res) => {
  const checkedList = req.body.checkedList;
  List.findByIdAndRemove(checkedList, (err, removed) => {
    if (removed) {
      res.redirect("/");
    } else {
      console.log(err);
    }
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
  console.log("server running");
});
