import React from "react";

const useClipboard = () => {
  const [copyState, setCopyState] = React.useState("Copy");
  const contentRef = React.useRef<HTMLElement>(null);
  const copyToClipboard = (value?: string) => {
    const ref = contentRef?.current as HTMLElement | undefined | null;
    let code = value ? value : ref ? ref?.innerText : "";
    let newInput = document.createElement("textarea");
    newInput.value = code;
    document.body.appendChild(newInput);
    newInput.select();
    document.execCommand("copy");
    document.body.removeChild(newInput);
    setCopyState("Copied!");
  };

  return {
    copyToClipboard,
    copyState,
    contentRef,
  };
};

export default useClipboard;
