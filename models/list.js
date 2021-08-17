const mongoose = require("mongoose");

const tasksSchema = {
  name: {type: String,}
}
// Lists Schema
const listsSchema = {
    name: {type: String},
    tasks: [tasksSchema],
  };
  

//  Lists Model
module.exports = mongoose.model("List", listsSchema);
  