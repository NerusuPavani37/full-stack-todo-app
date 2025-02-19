const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
  const { title } = req.body;
  try {
    console.log("User ID:", req.user.id);
    const todo = new Todo({ title, user: req.user.id });
    console.log("Todo Object:", todo);
    await todo.save();
    console.log("Saved Todo:", todo);
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    let todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    if (todo.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ msg: "Not authorized to update this todo" });
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
      return res
        .status(403)
        .json({ msg: "Not authorized to delete this todo" });
    }

    await todo.deleteOne();
    res.json({ msg: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

exports.addSubtask = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ msg: "Todo Not Found" });

    const subtask = { title, completed: false };
    todo.subtasks.push(subtask);

    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

exports.updateSubtask = async (req, res) => {
  const { id, subtaskId } = req.params;
  const { completed } = req.body;

  try {
    const todo =await Todo.findById(id);
    if (!todo) return res.status(404).json({ msg: "Todo Not Found" });

    const subtask = todo.subtasks.id(subtaskId);
    if (!subtask) return res.status(404).json({ msg: "Subtask Not Found" });

    subtask.completed = completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

exports.deleteSubtask = async(req,res) =>{
  const {id, subtaskId} = req.params;

  try{
     const todo =await Todo.findById(id);
     if (!todo) return res.status(404).json({ msg: "Todo Not Found" });
     
    todo.subtasks = todo.subtasks.filter((sub) => sub._id.toString() !== subtaskId);
    await todo.save();
     await todo.save();
     res.json(todo);
  }catch(err){
    res.status(500).json({ msg: "Server error", err });
  }
}

