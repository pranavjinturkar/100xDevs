import React, { useState } from "react";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="space-y-2">
      <input
        className="px-4 py-3 rounded-md border-2 border-white placeholder:text-white outline-none"
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        className="px-4 py-3 rounded-md border-2 border-white placeholder:text-white outline-none"
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />

      <button
        className="px-4 py-3 bg-rose-500 rounded-md"
        onClick={() => {
          fetch("http://localhost:3000/todos", {
            method: "POST",
            body: JSON.stringify({
              title: title,
              description: description,
            }),
            headers: {
              "Content-type": "application/json",
            },
          })
            .then(async (res) => {
              const json = await res.json();
              alert("Todo Added");
            })
            .catch((err) => alert(err.message));
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

export default CreateTodo;
