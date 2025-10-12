import React from "react";
import Assignment1 from "./components/A1-profile-component";
import Assignment2 from "./components/A2-bg-changer";
import Assignment3 from "./components/A3-para-generator";
import Assignment4 from "./components/A4-github-card";
import Assignment5 from "./components/A5-otp-login";

const App = () => {
  return (
    <div className="bg-gradient-to-b from-rose-400 to-rose-600 w-full min-h-screen text-white">
      {/* <Assignment1 /> */}
      {/* <Assignment2 /> */}
      {/* <Assignment3 /> */}
      <Assignment4 />
      {/* <Assignment5 /> */}
    </div>
  );
};

export default App;
