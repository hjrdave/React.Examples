import React from "react";

const useDataAttributes = (dataAttribute: string) => {
  const [data, setData] = React.useState([]);
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((record) => {
      if (record.type === "attributes") {
        const changedAttrName = record?.attributeName;
        if (dataAttribute === changedAttrName) {
          const newValue = (record.target as any)?.getAttribute(
            changedAttrName
          );
          setData(JSON.parse(newValue));
        }
      }
    });
  });

  //set observer on target
  React.useEffect(() => {
    const element = document.querySelector(`#${dataAttribute}`);
    if (element) {
      observer.observe(element, {
        attributes: true,
      });
    }
  }, []);

  return {
    data,
  };
};

export default useDataAttributes;
