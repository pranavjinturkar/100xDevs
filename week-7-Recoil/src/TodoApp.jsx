import React from "react";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { allTtodos, filterKey, filterTodo, newTodo } from "./store/atoms/Todo";

const TodoApp = () => {
  return (
    <RecoilRoot>
      <div>
        <AddTodoFn />
        <AllTodosFn />
      </div>
    </RecoilRoot>
  );
};

export default TodoApp;

const AddTodoFn = () => {
  const [todo, setTodo] = useRecoilState(newTodo);
  const addNewTodo = useSetRecoilState(allTtodos);
  const [filter, setFilter] = useRecoilState(filterKey);

  function add() {
    if (todo.title === "" || todo.description === "") {
      return alert("Title and description are required");
    }
    addNewTodo((prev) => [todo, ...prev]);
    setTodo({
      description: "",
      title: "",
    });
  }
  return (
    <div>
      <input
        type="text"
        value={todo.title}
        placeholder="Title"
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <input
        type="text"
        value={todo.description}
        placeholder="Description"
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <button onClick={add}>Add +</button>
      <input
        type="text"
        value={filter}
        placeholder="Anything to filter"
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

const AllTodosFn = () => {
  const filteredTodos = useRecoilValue(filterTodo)

  if (filteredTodos.length == 0) return <div>No Todos Found</div>;

  return (
    <div>
      {filteredTodos.map((item, index) => (
        <div key={index}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};
