import { useState, useEffect } from "react";

const useQueryString = (key: string) => {
  const [value, setValue] = useState(() =>
    new URLSearchParams(window.location.search).get(key)
  );

  useEffect(() => {
    const onChange = () =>
      setValue(new URLSearchParams(window.location.search).get(key));
    window.addEventListener("popstate", onChange);
    return () => window.removeEventListener("popstate", onChange);
  }, [key]);

  return value;
};
export default useQueryString;
