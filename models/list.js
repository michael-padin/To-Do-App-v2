const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tasksSchema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
// Lists Schema
const listsSchema = new Schema(
  {
    name: { type: String },
    tasks: [tasksSchema],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("List", listsSchema);
