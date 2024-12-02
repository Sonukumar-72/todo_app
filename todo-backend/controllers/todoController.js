const Todo = require("../models/todoModel"); // Fixed typo in the file name
const logger = require("../utils/logger");

// Fetch all todos
exports.getTodos = async (req, res) => {
  console.log("Fetching the todos from DB");

  try {
    const todos = await Todo.find();

    // Logging fetched todos
    logger.info(`Fetched all the todos: ${JSON.stringify(todos)}`);

    res.status(200).json(todos); // Changed to 200 for success response
  } catch (error) {
    console.error("Error while fetching the todos", error);

    logger.error("Error while fetching todos: ", error.message);

    res.status(500).json({ message: "Something went wrong, please try again later." });
  }
};

// Add a new todo
exports.addTodo = async (req, res) => {
  const title = req.body.todo; // Assuming 'todo' is sent in the request body

  console.log("Adding a new todo:", title);

  try {
    const newTodo = new Todo({
      title: title, // Set the title for the new Todo
    });

    logger.info("Adding the todo to DB", newTodo);

    const savedTodo = await newTodo.save(); // Save the new todo in the database

    logger.info("Added the todo to DB:", savedTodo);

    res.status(201).json(savedTodo); // Changed to 201 for resource creation
  } catch (error) {
    console.error("Error while adding the todo", error);

    logger.error("Error while adding todo: ", error.message);

    res.status(500).json({ message: "Failed to add the todo, please try again." });
  }
};
