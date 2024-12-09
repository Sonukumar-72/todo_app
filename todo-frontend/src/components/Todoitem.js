import React from "react";


const TodoItem = ({ todo, onDelete, onComplete }) => {
  return (
    <li>
      <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
        {todo.title}
      </span>
      <button onClick={() => onComplete(todo.id)}>Complete</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
