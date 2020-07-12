import React, { useState, useEffect } from 'react';

import useCounter from './hooks/useCounter';
import CounterDisplay from './components/CounterDisplay';

export default function App() {
  const [paused, setPaused] = useState(true);

  const breakCounter = useCounter(5, 'break', paused);
  const sessionCounter = useCounter(25, 'session', paused);

  const [time, setTime] = useState(`${sessionCounter.count}:00`);
  const [label, setLabel] = useState(sessionCounter.label);

  function formatTime(count) {
    return count < 10 ? `0${count}:00` : `${count}:00`;
  }

  useEffect(() => {
    setTime(formatTime(sessionCounter.count));
  }, [sessionCounter.count]);

  useEffect(() => {
    const t = setInterval(() => {
      if (!paused) {
        if (time === '00:00') {
          if (label === sessionCounter.label) {
            setTime(formatTime(breakCounter.count));
            setLabel(breakCounter.label);
          } else {
            setTime(formatTime(sessionCounter.count));
            setLabel(sessionCounter.label);
          }
        } else {
          const numbers = time.replace(/:/, '').split('').map((n) => parseInt(n, 10));

          if (numbers[3] === 0) {
            if (numbers[2] === 0) {
              if (numbers[1] === 0) {
                numbers[0] -= 1;
                numbers[1] = 9;
              } else {
                numbers[1] -= 1;
              }
              numbers[2] = 5;
            } else {
              numbers[2] -= 1;
            }
            numbers[3] = 9;
          } else {
            numbers[3] -= 1;
          }

          setTime(`${numbers[0]}${numbers[1]}:${numbers[2]}${numbers[3]}`);
        }
      }
    }, 1000);

    return () => {
      clearInterval(t);
    };
  }, [paused, time, label]);

  return (
    <div>
      <CounterDisplay counter={breakCounter} />
      <CounterDisplay counter={sessionCounter} />

      <h1 data-testid="timer-label">{label}</h1>
      <div data-testid="time-left">{time}</div>
      <button type="button" data-testid="start-stop" onClick={() => setPaused(!paused)}>Play</button>
    </div>
  );
}
