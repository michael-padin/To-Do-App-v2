const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Tasks Schema
const tasksSchema = new Schema({
  name: { type: String, default: 0 },
});

module.exports = mongoose.model("Home", tasksSchema);
