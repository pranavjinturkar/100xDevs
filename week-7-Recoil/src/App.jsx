import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { countAtom, isCountEven } from "./store/atoms/Count";

function App() {
  // wrap anyone that wants to use the teleported value inside a provider
  return (
    <RecoilRoot>
      <div>
        <Count />
      </div>
    </RecoilRoot>
  );
}

function Count() {
  console.log("re-render");
  return (
    <div>
      <CountRenderer />
      <Buttons />
      <IsCountEvenlol />
    </div>
  );
}

function CountRenderer() {
  const count = useRecoilValue(countAtom);
  return <div>{count}</div>;
}

function IsCountEvenlol() {
  const isEven = useRecoilValue(isCountEven);
  return <div>{isEven}</div>;
}

function Buttons() {
  // const count = 0;
  const setCount = useSetRecoilState(countAtom);
  return (
    <div>
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        Increase
      </button>

      <button
        onClick={() => {
          setCount((prev) => prev - 1);
        }}
      >
        Decrease
      </button>
    </div>
  );
}

export default App;
