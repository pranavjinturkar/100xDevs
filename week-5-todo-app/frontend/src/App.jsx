import { useState, useEffect } from "react";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos").then(async function (res) {
      const json = await res.json();
      setTodos(json.todos);
    });
  }, []);

  console.log(todos);
  return (
    <section className="bg-indigo-800 w-full h-screen text-white px-10 py-4 space-y-4">
      <CreateTodo />
      <Todos todos={todos} />
    </section>
  );
}

export default App;
