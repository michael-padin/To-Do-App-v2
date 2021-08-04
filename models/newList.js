const mongoose = require("mongoose");

// Today List Schema
const NewListSchema = new mongoose.Schema({
    name: { type: String, required: true },
  });
  //Today List Model
module.exports = mongoose.model("NewList", NewListSchema);