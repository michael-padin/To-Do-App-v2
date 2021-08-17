const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tasksSchema = new Schema({
  name: { type: String },
});
// Lists Schema
const listsSchema = new Schema({
  name: { type: String },
  link: { type: String , default: ''},
  tasks: [tasksSchema],
});

module.exports = mongoose.model("List", listsSchema);
