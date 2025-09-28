import { SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([
    {
      todoId: 1,
      title: "Create a Todo App",
      description: "First Mini Project is Todo App",
    },
  ]);
  const [todoId, setTodoId] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  function generateTodoId() {
    const number = Math.round(Math.random() * 1000 * 1000 * 100);
    todos.map((t) =>
      t.todoId === number ? generateTodoId() : setTodoId(number)
    );
  }

  // Add Todo
  function handleAddorEditTodo() {
    if (title.trim().length === 0 || description.trim().length === 0) {
      alert("Please Put Title and Description");
      return;
    }
    if (isEditing) {
      const editedTodo = {
        todoId: editTodoId,
        description,
        title,
      };
      // setTodos([
      //   ...todos.filter((todo) => todo.todoId != editTodoId),
      //   editedTodo,
      // ]);
      setTodos(
        ...[todos.map((t) => (t.todoId === editTodoId ? editedTodo : t))]
      );
      setIsEditing(false);
      setEditTodoId(null);
    } else {
      generateTodoId();
      setTodos([
        ...todos,
        {
          todoId,
          title,
          description,
        },
      ]);
    }
    setTitle("");
    setDescription("");
  }

  // Edit Todo
  function handleEditTodo(id) {
    setIsEditing(true);
    const todo = todos.find((todo) => todo.todoId === id);
    setEditTodoId(id);
    setTitle(todo.title);
    setDescription(todo.description);
  }

  // Delete Todo
  function handleDeleteTodo(id) {
    // const filteredTodo = todos.filter((todo) => todo.id !== id);
    // setTodos(filteredTodo);
    setTodos(todos.filter((todo) => todo.todoId != id));
  }

  return (
    <section className="relative z-0 w-full h-full flex flex-col items-center justify-center">
      <h1 className="text-4xl text-white font-serif font-semibold mb-6">
        Your Basic Todo App
      </h1>
      <div className="flex w-full justify-center gap-6 items-center mb-6">
        <input
          type="text"
          className="bg-amber-500 border-2 hover:border-2 hover:border-amber-600 transition-colors duration-200 hover:bg-amber-600 rounded-md px-4 py-2 text-white font-semibold placeholder:text-white outline-none shadow-md"
          placeholder="Title of the Todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-amber-500 border-2 hover:border-2 hover:border-amber-600 transition-colors duration-200 hover:bg-amber-600 rounded-md px-4 py-2 text-white font-semibold placeholder:text-white outline-none shadow-md"
          placeholder="Enter Description..."
        />
        <button
          className="bg-amber-500 cursor-pointer font-semibold hover:bg-amber-600 transition-colors duration-200 active:bg-amber-800 text-white px-4 py-2 rounded-md"
          onClick={handleAddorEditTodo}
        >
          {isEditing ? "Edit Todo" : "+ Add Todo"}
        </button>
      </div>
      <div className="w-full flex flex-col items-center gap-4">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              key={todo.todoId}
              className="w-md py-3 flex items-center justify-between px-4 rounded-md bg-amber-500 shadow-md hover:scale-x-105 duration-300 transition-all"
            >
              <div className="flex flex-col items-start">
                <h3 className="text-xl font-bold text-white">{todo.title}</h3>
                <p className="text-sm text-white italic">{todo.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <SquarePen
                  className="text-white hover:scale-110 transition-all duration-200 cursor-pointer"
                  onClick={() => handleEditTodo(todo.todoId)}
                />
                <Trash2
                  className="text-red-500 cursor-pointer transition-all duration-200 hover:scale-110"
                  onClick={() => handleDeleteTodo(todo.todoId)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="mt-4 text-gray-50 text-xl font-semibold">
            No Todos at the moment
          </div>
        )}
      </div>
      <div
        className={`absolute bottom-10 flex items-center transition-all duration-300 gap-4 shadow-md bg-red-600 text-white px-4 py-3 rounded-lg ${
          isEditing
            ? "scale-100 opacity-100 pointer-events-auto"
            : "opacity-0 scale-0 pointer-events-none"
        }`}
      >
        You're editing a Todo <SquarePen className="text-white" />
      </div>
    </section>
  );
};

export default TodoApp;
