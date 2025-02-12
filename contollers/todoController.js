const Todo = require("../models/Todo");

exports.createTodo = async(req,res) =>{
  const {title} = req.body;
  try{
     const todo = new Todo({title, user : req.user.id});
     await todo.save();
     res.status(201).json(todo);
  }catch(err){
    console.log(err);
    res.status(500).json({ msg: "Server error",err });
  }
};

exports.getTodos = async(req,res) =>{
  try{
    const todos = await Todo.find({user : req.user.id});
    res.json(todos);
  }catch(err){
    res.status(500).json({ msg: "Server error",err });
  }
}