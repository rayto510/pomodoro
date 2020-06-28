import { useState } from 'react';

export default function useCounter(initial, variant) {
  const [count, setCount] = useState(initial);

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increment = () => {
    if (count < 60) {
      setCount(count + 1);
    }
  };

  return {
    count,
    variant,
    decrement,
    increment,
  };
}
