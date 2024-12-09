import React, { useState, useEffect } from "react";
import AddTodo from "./AddTodo"; // Ensure this file exists and is correctly named
import Todoitem from "./Todoitem"; // Ensure this file exists and is correctly named
import BACKEND_URL from "../config/config"; // Ensure the backend URL is correct in your config file

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // Fetch todos when the component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        console.log("Fetching todos from:", `${BACKEND_URL}/get-todo`);
        const response = await fetch(`${BACKEND_URL}/get-todo`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch todos: ${response.statusText}`);
        }

        const data = await response.json();
        setTodos(data);
        console.log("Fetched Todos:", data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Add a new todo
  const addTodo = async (title) => {
    try {
      const response = await fetch(`${BACKEND_URL}/add-todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, completed: false }), // Assuming `completed` is a required field.
      });

      if (!response.ok) {
        throw new Error(`Failed to add todo: ${response.statusText}`);
      }

      const newTodo = await response.json();
      setTodos((prev) => [...prev, newTodo]); // Add the new todo to the existing list
      console.log("New Todo added:", newTodo);
    } catch (error) {
      console.error("Error while creating the todo:", error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodo onAdd={addTodo} /> {/* Pass the correct addTodo function */}
      <ul>
        {todos.map((todo) => (
          <Todoitem key={todo._id} todo={todo} /> // Ensure each todo has a unique _id
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
