import React, { useState } from "react";

function AddTodo({ onAdd }) {
  const [todo, setTodo] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todo.trim()) {
      onAdd(todo); // Call the `onAdd` function passed via props
      setTodo(""); // Clear input field
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a new todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default AddTodo;
