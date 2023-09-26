/**Chat GBT generated hook */

import { useState, useEffect, useRef } from "react";

const useIdle = (timeout = 5000) => {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutId = useRef<number | null>(null);

  useEffect(() => {
    const onEvent = () => {
      clearTimeout(timeoutId.current!);
      setIsIdle(false);
      timeoutId.current = window.setTimeout(() => setIsIdle(true), timeout);
    };

    window.addEventListener("mousemove", onEvent);
    window.addEventListener("keydown", onEvent);

    return () => {
      window.removeEventListener("mousemove", onEvent);
      window.removeEventListener("keydown", onEvent);
      clearTimeout(timeoutId.current!);
    };
  }, [timeout]);

  return isIdle;
};
export default useIdle;
