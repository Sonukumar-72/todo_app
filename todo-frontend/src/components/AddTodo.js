import React, { useState } from 'react';

const AddTodo = () => {
  const [todo, setTodo] = useState('This is a Todo');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    console.log(todo); // Logs the current state of the "todo"
    setTodo(''); // Optionally clear the input field after submission

    try {
      const response = await fetch('http://localhost:3000/add-todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ todo }),
      });

      const data = await response.json(); // Parse response JSON if needed
      console.log('Response received:', data);
    } catch (err) {
      console.error('Error occurred while adding todo:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)} // Updates the state dynamically
        placeholder="Enter a new todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodo;
