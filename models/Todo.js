const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema({
  title : String,
  completed : {type : Boolean , default : false},
});

const toDoSchema = new mongoose.Schema({
  user : {type : mongoose.Schema.Types.ObjectId, ref : "User"},
  title : String,
  completed : {type : Boolean , default : false},
  subtasks : [subtaskSchema]
});

module.exports = mongoose.model("Todo", toDoSchema);