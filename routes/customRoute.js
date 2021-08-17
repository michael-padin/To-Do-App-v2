const express = require("express");
const List = require("../models/list");
const _ = require("lodash");
const router = express.Router();


router.post("/deleteCustomListItem", (req, res) => {
  const listId = req.body.customListName;
  const taskId = req.body.customListItem;

  List.findByIdAndUpdate(
    listId,
    { $pull: { tasks: { _id: taskId } } },
    (err) => {
      if (!err) {
        res.redirect("/tasks");
      }
    }
  );
});

const tasks = []

// RENDERING CUSTOM LISTS IN SIDEBAR
router.get("/lists/:customListName", (req, res) => {
  const taskButton = req.body.taskButton;
  const customListName = req.params.customListName;
  List.findOne({ name: customListName }, (err, foundList) => {
    if (!err) {
      if (!foundList) {
        const newList = new List({
          name: customListName,
          tasks: tasks
        });
        newList.save();
        res.redirect("/lists/" + taskButton);
      } else {
        List.find({}, (err, allLists) => {
          if (allLists) {
            res.render("lists", {
              homeTitle: foundList.name,
              newTaskItem: foundList.tasks,
              lists: allLists,
            });
          } else {
            return err;
          }
        });
      }
    }
  });
});

// POSTING LISTS IN SIDEBAR
router.post("/lists", (req, res) => {
  const newLists = _.capitalize(req.body.newList);
  const lists = new List({ name: newLists });

  lists.save();
  res.redirect("/lists/" + newLists);
});

// DELETING CUSTOM LISTS
router.post("/deleteList", (req, res) => {
  const checkedList = req.body.checkedList;
  List.findByIdAndRemove(checkedList, (err, removed) => {
    if (removed) {
      res.redirect("/");
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
