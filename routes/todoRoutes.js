const express = require("express")
const {createTodo, getTodos} = require("../contollers/todoController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createTodo);
router.get("/",authMiddleware,getTodos);

module.exports = router;