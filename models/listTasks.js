const mongoose = require("mongoose");

// Important Task Schema
const listTasks = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// Important Task Model
module.exports= mongoose.model("ListTask", listTasks);