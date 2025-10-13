import { useEffect, useState } from "react";

export default function useDebounce(value, timeout) {
  const [debouncedVal, setDebouncedVal] = useState("");

  useEffect(() => {
    const timeoutVal = setTimeout(() => {
      setDebouncedVal(value);
    }, timeout);


   //  setDebouncedVal(value);

    return () => clearTimeout(timeoutVal);
  }, [value, timeout]);

  return debouncedVal;
}
