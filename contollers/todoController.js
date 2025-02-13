const Todo = require("../models/Todo");

exports.createTodo = async(req,res) =>{
  const {title} = req.body;
  try{
     const todo = new Todo({title, user : req.user.id});
     await todo.save();
     console.log("Saved Todo:", todo);
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

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    let todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized to update this todo" });
    }

    todo.title = title || todo.title;
    todo.completed = completed !== undefined ? completed : todo.completed;

    await todo.save();
    console.log("Saved Todo:", todo);
    res.json(todo);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    let todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized to delete this todo" });
    }

    await todo.deleteOne();
    res.json({ msg: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};