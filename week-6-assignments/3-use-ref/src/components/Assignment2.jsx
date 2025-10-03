import React, { useState, useCallback, useRef, useEffect } from "react";

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

let rerenderCount = 0;
export function Assignment2() {
  const [, forceRender] = useState(0);
  const rerenderCount = useRef(0);

  // useEffect(() => {
  //   persistDiv.current = persistDiv.current + 1;
  // }, []);

  const handleReRender = () => {
    // Update state to force re-render
    forceRender(Math.random());
  };

  rerenderCount.current = rerenderCount.current + 1;

  return (
    <div>
      <p>This component has rendered {rerenderCount.current} times.</p>
      <button onClick={handleReRender}>Force Re-render</button>
    </div>
  );
}
