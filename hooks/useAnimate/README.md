# useAnimate Hook Documentation

This custom React hook allows you to easily add CSS animations to components. It provides flexibility by supporting various animation types such as fadeIn, translate, or scale. The animation is triggered based on specified options.

## Parameters

- `options`: An object containing animation options.

  - `type`: Type of animation (`fadeIn`, `translate`, `scale`).
  - `delay` (optional): Delay before animation starts (in seconds). Defaults to `0`.
  - `duration` (optional): Duration of the animation (in seconds). Defaults to `1`.
  - `style` (optional): Additional CSS properties to apply.
  - `disabled` (optional): Flag to disable animation. Defaults to `false`.

## Return Value

An object containing style properties to apply the animation.

## Usage

```javascript
import React from "react";
import useAnimate, { Options } from "./useAnimate";

const MyComponent = () => {
  // Example usage of useAnimate hook
  const options: Options = {
    type: "fadeIn",
    delay: 0.5,
    duration: 1.5,
    style: { backgroundColor: "lightblue" },
    disabled: false,
  };

  const { style } = useAnimate(options);

  return (
    <div style={style}>
      {/* Your component content */}
      Hello, world!
    </div>
  );
};

export default MyComponent;

