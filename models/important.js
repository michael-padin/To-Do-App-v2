const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Tasks Schema
const importantSchema = new Schema({
  name: { type: String },
});

module.exports = mongoose.model("Important", importantSchema);
