const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Tasks Schema
const taskSchema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" }}
);

module.exports = mongoose.model("Task", taskSchema);
