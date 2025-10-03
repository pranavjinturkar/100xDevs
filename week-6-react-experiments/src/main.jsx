import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UseEffectApp from "./useEffectApp.jsx";
import UseMemoApp from "./UseMemoApp.jsx";
import UseRefApp from "./UseRefApp.jsx";

createRoot(document.getElementById("root")).render(<UseRefApp />);
