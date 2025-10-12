import {
  RecoilRoot,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { todosAtomFamily } from "./AtomFamilyAtoms";
import React, { useEffect } from "react";

function AtomFamilyApp() {
  return (
    <RecoilRoot>
      {/* <UpdaterComponent /> */}
      {/* <React.Suspense fallback={<div>Loading...</div>}> */}
      <Todo id={1} />
      <Todo id={2} />
      <Todo id={2} />
      <Todo id={2} />
      <Todo id={2} />
      {/* </React.Suspense> */}
    </RecoilRoot>
  );
}

function UpdaterComponent() {
  const updateTodo = useSetRecoilState(todosAtomFamily(2));

  useEffect(() => {
    setTimeout(() => {
      updateTodo({
        id: 2,
        title: "New Todo",
        description: "New Todo Desc",
      });
    }, 3500);
  }, []);

  return <div></div>;
}

function Todo({ id }) {
  //   const [todo, setTodo] = useRecoilState(todosAtomFamily(id));
  const todo = useRecoilValueLoadable(todosAtomFamily(id));

  if (todo.state === "loading") return <div>Loading id: {id}</div>;
  else
    return (
      <>
        {todo.contents.title}
        <br />
        UserId: {todo.contents.userId}
        <br />
      </>
    );
}

export default AtomFamilyApp;
