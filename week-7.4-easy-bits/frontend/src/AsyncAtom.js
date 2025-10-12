import axios from "axios";
import { atom, selector } from "recoil";

export const notificationsAtom = atom({
  key: "notificationsObjAtom",
  default: selector({
    key: "fetchNotifications",
    get: async () => {
      const res = await axios.get("http://localhost:3000/notifications");
      return res.data;
    },
  }),
});

// default: {
//     notifications: 0,
//     messaging: 0,
//     jobs: 0,
//     network: 0,
//   },

export const totalNotificationsAtoms = selector({
  key: "totalNotificationsAtoms",
  get: ({ get }) => {
    //  const networkAtomCount = get(notificationsAtom).network;
    //  const notificationAtomCount = get(notificationsAtom).notifications;
    //  const jobsAtomCount = get(notificationsAtom).jobs;
    //  const messagingAtomCount = get(notificationsAtom).messaging;

    //  return (
    //    notificationAtomCount +
    //    networkAtomCount +
    //    jobsAtomCount +
    //    messagingAtomCount
    //  );

    // OR

    const notificationsCount = get(notificationsAtom);

    return (
      notificationsCount.network +
      notificationsCount.jobs +
      notificationsCount.messaging +
      notificationsCount.notifications
    );
  },
});
