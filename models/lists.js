const mongoose = require("mongoose");

// Lists Schema
const listsSchema = {
    name: String,
    tasks: [{name:{type: String, required: true}}],
  };
  
//  Lists Model
module.exports = mongoose.model("List", listsSchema);
  