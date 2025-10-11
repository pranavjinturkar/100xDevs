import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Loading from "./components/Loading";
// import Dashboard from "./components/Dashboard";
// import LandingPage from "./components/LandingPage";
const Dashboard = lazy(() => import("./components/Dashboard"));
const LandingPage = lazy(() => import("./components/LandingPage"));

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppBar />
        <Routes>
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<Loading />}>
                <Dashboard />{" "}
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <LandingPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

function AppBar() {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      <button onClick={() => navigate("/")}>Landing Page</button>
    </div>
  );
}
