const mongoose = require("mongoose");

const newListTask = new mongoose.Schema({
  name: { type: String, required: true},
});

module.exports = mongoose.model("newListTask", newListTask);
