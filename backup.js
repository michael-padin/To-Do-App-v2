
// //jshint esversion:6

// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const app = express();
// const _ = require("lodash");
// const Task = require("./models/task");
// const List = require("./models/list");
// require("dotenv").config();

// app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

// mongoose.connect(
//   "mongodb://localhost:27017/mytodolistDB",
//   {
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true,
//   },
//   (err) => {
//     if (!err) {
//       console.log("MongoDB Connection Succeeded.");
//     } else {
//       console.log("Error in DB connection: " + err);
//     }
//   }
// );

// const defaultItem = [];

// app.get("/", (req, res) => {

//  const listName = req.body.taskButton;
 
//   let date = new Date().toLocaleString("en-us", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//   });

//   // if(listName === "Tasks") {
//   //   Task.find({}, (err, tasks)=> {
//   //     if(tasks) {
//   //       CustomList.find({}, (err, list) => {
//   //         if (list) {

//   //         }
//   //       })
//   //     }
//   //   })
//   // }


//   Task.insertMany(defaultItem, (err, inserted) => {
//     if (inserted) {
//       Task.find({}, (err, foundTasks) => {
//         if (foundTasks) {
//           List.find({}, (err, foundLists) => {
//             if (foundLists) {
//               res.render("home", {
//                 homeTitle: "Today",
//                 newTaskItem: foundTasks,
//                 lists: foundLists,
//                 date: date,
//               });
//             } else {
//               console.log(err);
//             }
//           });
//         } else {
//           console.log(err);
//         }
//       });
//     }
//   });
// });

// app.post("/", (req, res) => {
//   const taskInput = req.body.taskInput;
//   const taskButton = req.body.taskButton;
//   const task = new Task({ name: taskInput });

//   if (taskButton === "Today") {
//     task.save();
//     res.redirect("/");
//   } else {
//     List.findOne({ name: taskButton }, (err, foundList) => {
//       foundList.tasks.push(task);
//       foundList.save();
//       res.redirect("/" + taskButton);
//     });
//   }
// });

// app.post("/delete", (req, res) => {
//   const listName = req.body.listName;
//   const checkedItem = req.body.checkedItem;

//   if (listName === "Today") {
//     Task.findByIdAndRemove(checkedItem, (err) => {
//       if (!err) {
//         res.redirect("/");
//       }
//     });
//   } else {
//     List.findOneAndUpdate(
//       { name: listName },
//       { $pull: { tasks: { _id: checkedItem } } },
//       (err, foundList) => {
//         if (foundList) {
//           res.redirect("/" + listName);
//         }
//       }
//     );
//   }
// });

// app.get("/:customListName/", (req, res) => {
//   const customListName = req.params.customListName;
//   List.findOne({ name: customListName }, (err, foundList) => {
//     if (!err) {
//       if (!foundList) {
//         const newList = new List({ name: customListName, tasks: defaultItem });
//         newList.save();
//         res.redirect("/" + customListName);
//       } else {
//         CustomList.find({}, (err, foundLists) => {
//           if (foundLists) {
//             res.render("list", {
//               homeTitle: foundList.name,
//               newTaskItem: foundList.tasks,
//               lists: foundLists,
//             });
//           }
//         });
//       }
//     }
//   });
// });
// const customListSchema = {
//   name: [{ type: String, required: true, unique: true }],
// };
// const CustomList = mongoose.model("CustomList", customListSchema);

// app.post("/lists", (req, res) => {
//   const newLists = _.capitalize(req.body.newList);
//   const lists = new CustomList({ name: newLists });

//   lists.save();
//   res.redirect("/" + newLists);
// });

// app.post("/deleteList", (req, res) => {
//   const checkedList = req.body.checkedList;
//   CustomList.findByIdAndRemove(checkedList, (err, removed) => {
//     if (removed) {
//       res.redirect("/");
//     } else {
//       console.log(err);
//     }
//   });
// });


// const PORT = process.env.PORT || 4000;

// app.listen(PORT, function () {
//   console.log("server running");
// });