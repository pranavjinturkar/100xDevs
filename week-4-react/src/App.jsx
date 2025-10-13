import { useState } from "react";
import TodoApp from "./pages/todoApp/TodoApp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <section className="h-screen w-full bg-gray-900">
      <TodoApp />
    </section>
  );
}

export default App;
