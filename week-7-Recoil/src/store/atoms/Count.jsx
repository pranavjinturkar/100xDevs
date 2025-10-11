import { atom, selector } from "recoil";

export const countAtom = atom({
  key: "countAtom",
  default: 0,
});

export const isCountEven = selector({
  key: "isCountEven",
  get: ({ get }) => {
    const count = get(countAtom);

    return count % 2 === 0 ? "It is even you fuctard!" : "";
  },
});
