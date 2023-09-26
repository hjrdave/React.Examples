import { useState, useEffect } from "react";

const useCookie = (key: string) => {
  const initialValue = document.cookie.match(`(^|;)\\s*${key}\\s*=\\s*([^;]+)`);
  const [get, set] = useState(initialValue ? initialValue.pop() : "");

  useEffect(() => {
    document.cookie = `${key}=${get}`;
  }, [key, get]);

  return { get, set };
};

export default useCookie;
