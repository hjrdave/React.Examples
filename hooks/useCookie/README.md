```markdown
# useCookie Hook Documentation

This hook provides functionality to manage cookies in a React component.

## Usage

### Import

Import the `useCookie` hook into your React component:

```javascript
import { useState, useEffect } from "react";
import useCookie from "./useCookie";
```

### Example Usage

```javascript
import React from "react";
import useCookie from "./useCookie";

const MyComponent = () => {
  // Example usage of useCookie hook
  const { get, set } = useCookie("exampleCookie");

  const handleClick = () => {
    set("cookieValue");
  };

  return (
    <div>
      <button onClick={handleClick}>Set Cookie</button>
      <p>Cookie Value: {get}</p>
    </div>
  );
};

export default MyComponent;
```

In this example, the hook is used to manage a cookie named "exampleCookie". The `get` function retrieves the value of the cookie, and the `set` function sets a new value for the cookie when the button is clicked.

## Return Value

The `useCookie` hook returns an object with the following properties:

- `get`: A function to retrieve the value of the cookie.
- `set`: A function to set a new value for the cookie.

```
