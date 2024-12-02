const express = require("express");
const { getTodos, addTodo } = require("../controllers/todoController"); // Adjust path as needed

const router = express.Router();

// Define routes
router.get("/get-todo", getTodos);
router.post("/add-todo", addTodo);

module.exports = router;
