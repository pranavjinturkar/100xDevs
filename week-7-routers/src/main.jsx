import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./RoutingApp.jsx";
import PropDrillApp from './PropDrillingApp.jsx'

createRoot(document.getElementById("root")).render(<PropDrillApp />);
