const mongoose = require("mongoose");

// All Task Schema
const allTaskTaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// All Task Model
module.exports = mongoose.model("AllTask", allTaskTaskSchema);
