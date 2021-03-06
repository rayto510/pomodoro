import { useState } from 'react';

export default function useCounter(initial, variant, paused) {
  const [count, setCount] = useState(initial);

  const decrement = () => {
    if (count > 1 && paused) {
      setCount(count - 1);
    }
  };

  const increment = () => {
    if (count < 60 && paused) {
      setCount(count + 1);
    }
  };

  const label = `${variant.charAt(0).toUpperCase() + variant.slice(1)}`;

  return {
    count,
    variant,
    decrement,
    increment,
    label,
  };
}
