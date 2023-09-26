import React from "react";

const useDebounce = (fn: any, delay: number) => {
  const debouncedFn = (fn: any, delay: number) => {
    let timeout: any;
    return function (...args: any) {
      /* @ts-ignore */
      const context = this;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        fn.apply(context, args);
      }, delay);
    };
  };
  return React.useCallback(
    debouncedFn((...args: any) => fn(...args), delay),
    [fn, delay]
  );
};

export default useDebounce;
