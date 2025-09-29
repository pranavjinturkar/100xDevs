import React, { useState } from "react";

const Todos = ({ todos }) => {
  const [completed, setCompleted] = useState(false);

  async function handleUpdateTodo(todoId) {
    setCompleted((prev) => !prev);
    const res = await fetch(`http://localhost:3000/todos/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isCompleted: true,
      }),
    });
    const data = await res.json();
    if (data.success) alert("updated successfully");
  }
  return (
    <div>
      {todos.map((item, index) => (
        <div key={index}>
          <h1>{item.title}</h1>
          <h3>{item.description}</h3>
          <button onClick={() => handleUpdateTodo(item._id)}>
            {item.isCompleted ? "Completed" : "Mark as Complete"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Todos;
