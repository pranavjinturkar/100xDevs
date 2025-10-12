import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { notificationsAtom, totalNotificationsAtoms } from "./AsyncAtom";
import axios from "axios";
import React, { useEffect } from "react";

function AsynApp() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
         <BottomBar />
      </React.Suspense>
    </RecoilRoot>
  );
}

export default AsynApp;

function BottomBar() {
  const [notifactionsObj, setNotificationsObj] =
    useRecoilState(notificationsAtom);
  const totalCount = useRecoilValue(totalNotificationsAtoms);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/notifications")
//       .then((res) => {
//         setNotificationsObj(res.data);
//       })
//       .catch((error) => console.log(error, error.message));
//   }, []);

  return (
    <div>
      <button>Home</button>
      <button>
        My Network (
        {notifactionsObj.network > 100 ? "99+" : notifactionsObj.network})
      </button>
      <button>
        Jobs ({notifactionsObj.jobs > 100 ? "99+" : notifactionsObj.jobs})
      </button>
      <button>
        Messaging (
        {notifactionsObj.messaging > 100 ? "99+" : notifactionsObj.messaging})
      </button>
      <button>
        Notifications (
        {notifactionsObj.notifications > 100
          ? "99+"
          : notifactionsObj.notifications}
        )
      </button>
      <button>Me ({totalCount})</button>
    </div>
  );
}
