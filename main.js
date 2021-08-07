//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
var _ = require("lodash");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  "mongodb://localhost:27017/mytodolistDB",
  {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

// Tasks Schema
const tasksSchema = {
  name: { type: String, required: true },
};

// Tasks Model
const Task = mongoose.model("Task", tasksSchema);

// Lists Schema
const listsSchema = {
  name: String,
  tasks: [tasksSchema],
};

//  Lists Model
const List = mongoose.model("List", listsSchema);

const defaultItem = [];

app.get("/", (req, res) => {
  let date = new Date().toLocaleString("en-us", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  Task.insertMany(defaultItem, (err, inserted) => {
    if (inserted) {
      Task.find({}, (err, foundTasks) => {
        if (foundTasks) {
          AllList.find({}, (err, foundLists) => {
            if (foundLists) {
              res.render("home", {
                homeTitle: "Today",
                newTaskItem: foundTasks,
                lists: foundLists,
                date: date,
              });
            }
          });
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
      foundList.tasks.unshift(task);
      foundList.save();
      res.redirect("/" + taskButton);
    });
  }
});

app.post('/delete', (req, res) => {
  const listName = req.body.listName;
  const checkedItem = req.body.checkedItem;

  if(listName === "Today") {
    Task.findByIdAndRemove(checkedItem, (err) => {
      if(!err) {
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {tasks:{ _id: checkedItem}}}, (err, foundList) => {
      if(foundList) {
        res.redirect('/' + listName);
      }
    })

  }

});
 



app.get("/:customListName/", (req, res) => {
  const customListName = (req.params.customListName)
  List.findOne({ name: customListName }, (err, foundList) => {
    if (!err) {
      if (!foundList) {
        const newList = new List({ name: customListName, tasks: defaultItem });
        newList.save();
        res.redirect("/" + customListName);
      } else {
        AllList.find({}, (err, foundLists) => {
          if (foundLists) {
            res.render("list", {
              homeTitle: foundList.name,
              newTaskItem: foundList.tasks,
              lists: foundLists,
            });
          }
        });
      }
    }
  });
});




const allListSchema = {
  name: { type: String, required: true },
};

const AllList = mongoose.model("CustomList", allListSchema);
const customList = [];

app.post("/lists", (req, res) => {
  const newLists = req.body.newList;
  const lists = new AllList({ name: newLists });
  lists.save();
  res.redirect("/" + newLists);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
  console.log("server running");
});
