// // Deleting item
// app.post("/delete", function (req, res) {
//   let selectedItem = req.body.checkItem;
//   const listName = req.body.listName;

//   if (listName === "Today") {
//     Item.findByIdAndRemove(selectedItem, (err) => {
//       if (!err) {
//         res.redirect("/");
//       }
//     });
//   } else {
//     Lists.findOneAndUpdate(
//       { name: listName },
//       { $pull: { items: { _id: selectedItem } } },
//       (err, foundList) => {
//         if (!err) {
//           res.redirect("/" + listName);
//         }
//       }
//     );
//   }
// });

// // New Schema for list items
// const listsSchema = new mongoose.Schema({
//   name: String,
//   items: [taskSchema],
// });

// // Creating model for List items
// const Lists = new mongoose.model("list", listsSchema);

// app.get("/:customListName", (req, res) => {
//   const customListName = _.capitalize(req.params.customListName);
//   const list = new Lists({ name: customListName});

//   Lists.findOne({ name: customListName }, (err, foundLists) => {
//     if (!err) {
//       if (!foundLists) {
//         // If not exist
//         list.save();
//         res.redirect("/" + customListName);
//       } else {
//         res.render("home", {

//           homeTitle: foundLists.name,
//           newTaskItem: foundLists,
//         });
//       }
//     }
//   });
// });




// // app.post("/header", function (req, res) {
// //   const list = req.body.newList;
// //   lists.push(list);
// //   res.redirect("/list");
// // });

// // app.get("/list", function (req, res) {
// //   res.render("list",);
// // });

// // app.get("/important", function (req, res) {
// //   res.render("important",);
// // });

// // app.get("/tasks", function (req, res) {
// //   res.render("tasks",);
// });