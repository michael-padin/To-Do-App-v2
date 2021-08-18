const express = require("express");
const Important = require("../models/important");
const List = require("../models/list");
const router = express.Router();

// RENDERING IMPORTANT PAGE //
router.get("/important", (req, res) => {
  List.find({}, (err, foundLists) => {
    if (foundLists) {
      Important.find({}, (err, foundTasks) => {
        if (foundTasks) {
          res.render("important", {
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

//  POSTING IMPORTANT PAGE //
router.post("/importantPage", (req, res) => {
  const importantTaskInput = req.body.ImportantTaskInput;
  const task = new Important({ name: importantTaskInput });

  if (importantTaskInput == "") {
    res.redirect("/important");
  } else {
    task.save();
    res.redirect("/important");
  }
});

// DELETING ITEM IN IMPORTANT PAGE //
router.post("/deleteImportantTasks", (req, res) => {
  const importantTask = req.body.importantcheckedItem;

  Important.findByIdAndRemove(importantTask, (err) => {
    if (!err) {
      res.redirect("/important");
    }
  });
});

module.exports = router;
