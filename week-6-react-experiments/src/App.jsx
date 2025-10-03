import { useEffect, useState } from "react";
import RandomHeader from "./components/Header";
import { useMemo } from "react";

function App() {
  // const [title, setTitle] = useState("My name is Pranav");

  // function handleRandomTitle() {
  //   setTitle("My name is " + Math.random());
  // }

  // const [todos, setTodos] = useState([
  //   {
  //     title: "Title 1",
  //     description: "Description 1",
  //   },
  //   {
  //     title: "Gym",
  //     description: "Description 1",
  //   },
  //   {
  //     title: "Pubg",
  //     description: "Description 1",
  //   },
  // ]);

  // useEffect(() => {
  //   console.log("Called")
  //   addTodoRandom();
  // }, []);

  // function addTodoRandom() {
  //   let count = Math.round(Math.random() * 10);
  //   console.log(count);
  //   for (let i = count; i > 0; i--) {
  //     handleAddTodo();
  //   }
  // }

  // function handleAddTodo() {
  //   setTodos((prev) => [
  //     ...prev,
  //     {
  //       title: "Title: " + Math.round(Math.random() * 1000),
  //       description: "Description: " + Math.round(Math.random() * 100),
  //     },
  //   ]);
  // }

  const [input, setInput] = useState(0);
  const [count, setCount] = useState(0);
  const [counter, setCounter] = useState(0)

  // let counter = useMemo(() => {
  //   console.log("useMemo");
  //   let finalCount = 0;
  //   for (let i = 0; i <= input; i++) {
  //     finalCount += i;
  //   }
  //   return finalCount;
  // }, [input]);
  // setInput(counter)


  useEffect(() => {
    let finalCount = 0;
    for (let i = 0; i <= input; i++) {
      finalCount += i;
    }
    setCounter(counter)
  }, [input])

  return (
    // <section>
    //   <button
    //     className="px-4 py-3 border-2 bg-rose-400"
    //     onClick={handleRandomTitle}
    //   >
    //     Click me to change the title
    //   </button>
    //   <RandomHeader title={title} />
    //   <RandomHeader title={"Header2"} />
    //   <RandomHeader title={"Hecker"} />
    //   <RandomHeader title={"Header3"} />
    // </section>
    // <section className="bg-gray-600 px-10 py-2 space-y-4">
    //   <button
    //     className="px-4 py-3 bg-red-400 rounded-md"
    //     onClick={handleAddTodo}
    //   >
    //     Add Todo
    //   </button>
    //   <div className="flex flex-wrap items-center gap-4">
    //     {todos.map((todo, index) => (
    //       <TodoFn
    //         title={todo.title}
    //         description={todo.description}
    //         key={index}
    //       />
    //     ))}
    //   </div>
    // </section>
    // <section className="bg-gray-600 px-10 py-2 space-y-4">
    //   <CardWrapper>
    //     <InputComponent />
    //     <InputComponent />
    //     <InputComponent />
    //     <InputComponent />
    //     <InputComponent />
    //   </CardWrapper>
    // </section>
    // <section className="bg-red-400 min-h-screen w-full">
    //   <button
    //     className="px-4 py-2 rounded-md border-white text-lg border-2 bg-red-50"
    //     onClick={addTodoRandom}
    //   >
    //     Add Multiple Todo
    //   </button>
    //   <div className="w-full flex items-center gap-4 flex-wrap mt-4 px-4">
    //     {todos.map((todo, index) => (
    //       <TodoFn
    //         key={index}
    //         title={todo.title}
    //         description={todo.description}
    //       />
    //     ))}
    //   </div>
    // </section>
    <section className="flex flex-col gap-4 items-center h-screen w-full text-white bg-blue-600">
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="bg-red-600 rounded-md px-4 py-3 mb-4"
      />
      <p className="px-4 py-3 my-2 rounded-md bg-amber-500 ">{counter}</p>
      <button
        className="bg-red-400 px-2 py-1 rounded-md"
        onClick={() => setCount(count + 1)}
      >
        Counter ({count})
      </button>
    </section>
  );
}
export default App;

function InputComponent() {
  return <div>Hello</div>;
}

function CardWrapper({ children }) {
  return (
    <div className="w-md px-6 py-4 rounded-md border-2 border-rose-600 text-white">
      {children}
    </div>
  );
}

function TodoFn({ title, description }) {
  return (
    <div className="">
      <h1 className="text-lg border-2 px-4 py-2 mt-1 rounded-md border-red-200 w-fit">
        {title}
      </h1>
      <h3 className="text-base border-2 px-4 py-1 mt-1 rounded-md border-red-200 w-fit">
        {description}
      </h3>
    </div>
  );
}
