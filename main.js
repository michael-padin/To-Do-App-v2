const bodyParser = require("body-parser");
const { resolveInclude } = require("ejs");
const express = require("express");
const mongoose = require("mongoose");
var _ = require("lodash");
require("dotenv").config();
const router = express.Router();
const app = express();
const Today = require("./models/today");
const Important = require("./models/important");
const Tasks = require("./models/tasks");
const ListTasks = require("./models/listTasks");
const { fromPairs } = require("lodash");

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

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Today List Schema
const todayListSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
//Today List Model
const Lists = mongoose.model("todayList", todayListSchema);

app.post("/", (req, res) => {
  const inputTask = req.body.inputTask;
  const task = new Today({ name: inputTask });
  task.save();
  res.redirect("/");
});

app.get("/", (req, res) => {
  let date = new Date().toLocaleString("en-us", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  Lists.find({}, (err, foundList) => {
    if (err) {
      console.log(err);
    } else {
      Today.find({}, (err, docs) => {
        if (err) {
          console.log("error");
        } else {
          res.render("home", {
            date: date,
            homeTitle: "Today",
            newTaskItem: docs,
            lists: foundList,
          });
        }
      });
    }
  });
});

app.post("/important", (req, res) => {
  const importantInputTask = req.body.importantInputTask;
  const importantTask = new Important({ name: importantInputTask });
  importantTask.save();
  res.redirect("/important");
});

app.get("/important", (req, res) => {
  Lists.find({}, (err, importantFoundList) => {
    if (err) {
      console.log(err);
    } else {
      Important.find({}, (err, importantTask) => {
        if (err) {
          console.log("error");
        } else {
          res.render("important", {
            importantTitle: "Important",
            newTaskItem: importantTask,
            lists: importantFoundList,
          });
        }
      });
    }
  });
});

app.post("/tasks", (req, res) => {
  const allTaskInput = req.body.allTaskInput;
  const allTask = new Tasks({ name: allTaskInput });
  allTask.save();
  res.redirect("/");
});

app.get("/tasks", (req, res) => {
  Lists.find({}, (err, allFoundList) => {
    if (err) {
      console.log(err);
    } else {
      Tasks.find({}, (err, allTask) => {
        if (err) {
          console.log("error");
        } else {
          res.render("tasks.ejs", {
            allTaskTitle: "Tasks",
            newTaskItem: allTask,
            lists: allFoundList,
          });
        }
      });
    }
  });
});



const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
  console.log("server running");
});
