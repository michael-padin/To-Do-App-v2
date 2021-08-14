const mongoose = require("mongoose");

const tasksSchema = {
  name: {type: String, ref: "List"}
}
// Lists Schema
const listsSchema = {
    name: {type: String, required: true},
    tasks: [tasksSchema],
  };
  

//  Lists Model
module.exports = mongoose.model("List", listsSchema);
  