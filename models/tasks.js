const mongoose = require('mongoose');

// Tasks Schema
const tasksSchema = {
    name: { type: String, required: true },
};

// Tasks Model
module.exports = mongoose.model("Task", tasksSchema);
