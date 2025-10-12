import React, { useState } from "react";

const colors = {
  default: "",
  red: "#FF3B30",
  orange: "#FF9500",
  yellow: "#FFCC00",
  green: "#34C759",
  teal: "#30B0C7",
  blue: "#007AFF",
  indigo: "#5856D6",
  purple: "#AF52DE",
  pink: "#FF2D55",
  gray: "#8E8E93",
};

const Assignment2 = () => {
  const [color, setColor] = useState("");

  return (
    <div
      className={`w-full h-screen relative`}
      style={{ backgroundColor: color }}
    >
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 min-w-3xl px-3 py-1 flex items-center gap-2 bg-white rounded-lg">
        {Object.keys(colors).map((item, index) => {
          // Tailwind Doesnt support Dynamic Styling...
          // const bgColor = `bg-[${colors[item]}]`;
          const bgColor = colors[item] === "" ? "#FFD700" : colors[item];
          return (
            <div
              key={index}
              className={`px-4 py-1.5 text-white font-semibold rounded-full cursor-pointer`}
              style={{ backgroundColor: bgColor }}
              onClick={() => setColor(colors[item])}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Assignment2;
