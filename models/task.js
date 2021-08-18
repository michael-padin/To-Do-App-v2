const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Tasks Schema
const taskSchema = new Schema({
  name: { type: String},
});


module.exports = mongoose.model("Task", taskSchema);
