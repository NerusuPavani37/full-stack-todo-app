const express = require("express");
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  addSubtask,
  updateSubtask,
  deleteSubtask,
} = require("../contollers/todoController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createTodo);
router.get("/", authMiddleware, getTodos);
router.put("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);
router.post("/:id/subtask", authMiddleware, addSubtask);
router.put("/:id/subtask/:subtaskId", authMiddleware, updateSubtask);
router.delete("/:id/subtask/:subtaskId", authMiddleware, deleteSubtask);

module.exports = router;
