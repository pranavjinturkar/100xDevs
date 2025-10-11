import { atom, selector } from "recoil";

export const allTtodos = atom({
  key: "allTodos",
  default: [],
});

export const newTodo = atom({
  key: "title",
  default: {
    title: "",
    description: "",
  },
});

export const filterKey = atom({
  key: "filterKey",
  default: "",
});

// export const addTodo = selector({
//   key: "addTodo",
//   set: ({ get, set }) => {
//     const todos = get(allTtodos);
//   },
// });

export const filterTodo = selector({
  key: "filterTodo",
  get: ({ get }) => {
    const allTodos = get(allTtodos);
    const filter = get(filterKey);

    if (filter === "") return allTodos;

    return allTodos.filter(
      (t) => t.title.includes(filter) || t.description.includes(filter)
    );
  },
});
