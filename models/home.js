const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Tasks Schema
const tasksSchema = new Schema({
  name: { type: String },
});

module.exports = mongoose.model("Home", tasksSchema);
