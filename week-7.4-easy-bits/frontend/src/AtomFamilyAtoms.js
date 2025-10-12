import { atomFamily, selectorFamily } from "recoil";
import axios from "axios";
import { TODOS } from "./Todos";

// For Static Data

// export const todosAtomFamily = atomFamily({
//   key: "todosAtomFamily",
//   default: (id) => {
//     return TODOS.find((t) => t.id === id);
//   },
// });

// For dynamic Data fetching...

export const todosAtomFamily = atomFamily({
  key: "todosAtomFamily",
  default: selectorFamily({
    key: "fetchTodosFamily",
    get:
      (id) =>
      async ({ get }) => {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/todos?id=${id}`
        );

        console.log(res.data);
        return res.data[0];
      },
  }),
});
