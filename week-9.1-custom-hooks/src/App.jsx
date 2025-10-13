import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import useDebounce from "./Hooks/useDebounce";







function App() {
  // const [todos, isLoading] = useTodos(5);
  // if (isLoading) return <div>Loading...</div>;
  // return (
  //   <>
  //     {todos.map((todo) => (
  //       <Track todo={todo} key={todo.id} />
  //     ))}
  //   </>
  // );
  // const isOnline = useIsOnline();
  // return isOnline ? <div>IS Online</div> : <div>You are Offline</div>;
  // const { x, y } = useMousePointerHook();
  // return (
  //   <div>
  //     Your Position is: {x}, {y}
  //   </div>
  // );
  // const [count, setCount] = useState(0);

  // useInterval(() => setCount((c) => c + 1), 1);

  // return <div>{count}</div>;

  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 1000);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search....."
      />
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
}

function Track({ todo }) {
  return (
    <div>
      {todo.todo}
      <br />
      User: {todo.userId}
    </div>
  );
}

export default App;
