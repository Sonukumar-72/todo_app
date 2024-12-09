import React, { useState } from "react";
import "./styles.css";
import AddTodo from "./components/AddTodo";

function App() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]); // Add the new todo to the list
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <AddTodo onAdd={handleAddTodo} />
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
