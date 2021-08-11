const mongoose = require('mongoose');

// Tasks Schema
const importantSchema = {
    name: { type: String, required: true },
};

// Tasks Model
module.exports = mongoose.model("ImportantItems", importantSchema);
