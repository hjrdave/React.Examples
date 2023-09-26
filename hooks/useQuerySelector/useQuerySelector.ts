import React from "react";
const useQuerySelector = (selector: string) => {
  const [element, setElement] = React.useState<Element | null>(null);

  React.useEffect(() => {
    const selectedElem = document.querySelector(selector);
    setElement(selectedElem);
  }, []);

  return {
    element,
  };
};

export default useQuerySelector;
