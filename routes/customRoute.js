const express = require("express");
const List = require("../models/list");
const _ = require("lodash");
const router = express.Router();

const tasks = [];

// RENDERING CUSTOM LISTS IN SIDEBAR
router.get("/lists/:customListName", (req, res) => {
  const customListName = _.lowerCase(req.params.customListName);
  const newList = new List({ name: customListName, tasks: tasks });
  List.findOne({ name: customListName },(err, foundList) => {
    if (!err) {
      if (!foundList) {
        res.redirect("/lists/" + customListName);
        newList.save();
      } else {
        List.find({}, undefined, {sort: {created_at: 'desc'}}, (err, allLists) => {
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
  const newLists = _.kebabCase(req.body.newList);
  if (newLists == '') {
    res.redirect("/")
  } else {
  res.redirect("/lists/" + newLists);
}
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


router.get("/lists"), (req, res) => {
  res.render("lists");
}




module.exports = router;
