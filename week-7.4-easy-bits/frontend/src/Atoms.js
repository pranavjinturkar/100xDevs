import { atom, selector } from "recoil";

export const networkAtom = atom({
  key: "networkAtom",
  default: 102,
});

export const notificationAtom = atom({
  key: "notificationAtom",
  default: 12,
});
export const jobsAtom = atom({
  key: "jobsAtom",
  default: 0,
});
export const messagingAtom = atom({
  key: "messagingAtom",
  default: 0,
});

export const allAtoms = selector({
  key: "allAtom",
  get: ({ get }) => {
    const networkAtomCount = get(networkAtom);
    const notificationAtomCount = get(notificationAtom);
    const jobsAtomCount = get(jobsAtom);
    const messagingAtomCount = get(messagingAtom);

    return (
      notificationAtomCount +
      networkAtomCount +
      jobsAtomCount +
      messagingAtomCount
    );
  },
});
