const mongoose = require('mongoose');

// Tasks Schema
const taskSchema = {
    name: { type: String, required: true },
};

// Tasks Model
module.exports = mongoose.model("Task", taskSchema);
