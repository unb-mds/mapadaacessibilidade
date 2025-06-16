import React, { useState } from "react";

const initialCount = 0;

function Counter() {
  const [count, setCount] = useState(initialCount);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);
  const switchSign = () => setCount(-count);

  return (
    <div>
      <p data-testid="count">Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
      <button onClick={switchSign}>Switch Sign</button>
    </div>
  );
}

export default Counter;
