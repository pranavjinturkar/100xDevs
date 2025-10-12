import { RecoilRoot, useRecoilValue } from "recoil";
import {
  allAtoms,
  jobsAtom,
  messagingAtom,
  networkAtom,
  notificationAtom,
} from "./Atoms";

function App() {
  return (
    <RecoilRoot>
      <BottomBar />
    </RecoilRoot>
  );
}

export default App;

function BottomBar() {
  const networkNotificationCount = useRecoilValue(networkAtom);
  const jobsNotificationCount = useRecoilValue(jobsAtom);
  const notificationCount = useRecoilValue(notificationAtom);
  const messagingNotificationCount = useRecoilValue(messagingAtom);
  const totalCount = useRecoilValue(allAtoms);
  return (
    <div>
      <button>Home</button>
      <button>
        My Network (
        {networkNotificationCount > 100 ? "99+" : networkNotificationCount})
      </button>
      <button>
        Jobs ({jobsNotificationCount > 100 ? "99+" : jobsNotificationCount})
      </button>
      <button>
        Messaging (
        {messagingNotificationCount > 100 ? "99+" : messagingNotificationCount})
      </button>
      <button>
        Notifications ({notificationCount > 100 ? "99+" : notificationCount})
      </button>
      <button>Me ({totalCount})</button>
    </div>
  );
}
