const Todo = require("../models/todoModel"); // Fixed typo in the file name
const logger = require("../utils/logger");

// Fetch all todos
exports.getTodos = async (req, res) => {
  console.log("Fetching the todos from DB");

  try {
    const todos = await Todo.find();

    // Logging fetched todos
    logger.info(`Fetched all the todos: ${JSON.stringify(todos)}`);

    res.status(200).json(todos); // HTTP 200: Success
  } catch (error) {
    console.error("Error while fetching the todos", error);

    logger.error(`Error while fetching todos: ${error.message}`);

    res.status(500).json({
      message: "Something went wrong, please try again later.",
      error: error.message, // Optionally include error details
    });
  }
};

// Add a new todo
exports.addTodo = async (req, res) => {
  const { todo: title } = req.body; // Assuming 'todo' is sent in the request body

  console.log("Adding a new todo:", title);

  // Check if the title is provided
  if (!title || typeof title !== "string") {
    return res.status(400).json({ message: "Invalid input. 'todo' must be a non-empty string." });
  }

  try {
    const newTodo = new Todo({
      title, // Using shorthand property
    });

    logger.info("Adding the todo to DB", { title });

    const savedTodo = await newTodo.save(); // Save the new todo in the database

    logger.info("Added the todo to DB:", { id: savedTodo._id, title: savedTodo.title });

    res.status(201).json(savedTodo); // HTTP 201: Resource Created
  } catch (error) {
    console.error("Error while adding the todo", error);

    logger.error(`Error while adding todo: ${error.message}`);

    res.status(500).json({
      message: "Failed to add the todo, please try again.",
      error: error.message, // Optionally include error details
    });
  }
};
