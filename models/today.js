const mongoose = require("mongoose");


// Today Task Schema
const todayTaskSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  });
  
  // Today Task Model
module.exports = mongoose.model("todayTask", todayTaskSchema);