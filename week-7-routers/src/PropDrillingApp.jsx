import React, { useContext, useState } from "react";
import { CountContext } from "./Context";

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <CountContext.Provider value={count}>
        <Count setCount={setCount} />
      </CountContext.Provider>
    </div>
  );
};

export default App;

function Count({ setCount }) {
  return (
    <div>
      <CountRenderer />
      <Buttons onClickFn={setCount} />
    </div>
  );
}

function CountRenderer() {
  const count = useContext(CountContext);
  return <div>{count}</div>;
}

function Buttons({ onClickFn }) {
  return (
    <div>
      <button onClick={() => onClickFn((prev) => prev - 1)}>-1</button>
      <button onClick={() => onClickFn((prev) => prev + 1)}>+1</button>
    </div>
  );
}
