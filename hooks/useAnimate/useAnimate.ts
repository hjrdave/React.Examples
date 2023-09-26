/**This hook was generated by ChatGBT with some tweaks */

import React, { useState, useEffect, CSSProperties } from "react";

type AnimationType = "fadeIn" | "translate" | "scale";

export interface Options {
  type: AnimationType;
  delay?: number;
  duration?: number;
  style?: CSSProperties;
  disabled?: boolean;
}

const useAnimate = ({
  type,
  delay = 0,
  duration = 1,
  style,
  disabled,
}: Options) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!disabled) {
      const timeoutId = setTimeout(() => setAnimate(true), delay * 1000);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  let animation: CSSProperties = {};
  const animateTypes = {
    ["fadeIn"]: {
      opacity: 1,
      transition: `opacity ${duration}s`,
    },
    ["translate"]: {
      transform: "translate(0, 0)",
      transition: `transform ${duration}s`,
    },
    ["scale"]: {
      transform: "scale(1)",
      transition: `transform ${duration}s`,
    },
  };
  if (animate) {
    animation = animateTypes[type];
  }

  return { style: { ...style, ...animation } };
};

export default useAnimate;
