import { useCallback, useEffect, useRef, useState } from "react";

function UseRefApp() {
  // Do not use it
  //   useEffect(() => {
  //     setTimeout(() => {
  //       document.getElementById("incomeTaxContainer").innerHTML = 20;
  //     }, 5000);
  //   }, []);

  const divRef = useRef();

  useEffect(() => {
   setTimeout(() => {
      console.log(divRef.current)
      divRef.current.innerHTML = 69
   },5000)
  }, [])

  const incomeTax = 20000;

  return (
    <div>
      hi there, your income tax returns are <div ref={divRef}>{incomeTax}</div>
    </div>
  );
}

export default UseRefApp;
