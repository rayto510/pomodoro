import React, { useState, useEffect } from 'react';

import useCounter from './hooks/useCounter';
import CounterDisplay from './components/CounterDisplay';

export default function App() {
  const breakCounter = useCounter(5, 'break');
  const sessionCounter = useCounter(25, 'session');

  const [time, setTime] = useState(`${sessionCounter.count}:00`);
  const [label, setLabel] = useState(sessionCounter.label);

  function formatTime(count) {
    return count < 10 ? `0${count}:00` : `${count}:00`;
  }

  useEffect(() => {
    setTime(formatTime(sessionCounter.count));
  }, [sessionCounter.count]);

  function countDown(timeInput) {
    let time2 = timeInput;
    setInterval(() => {
      if (time2 === '00:00') {
        time2 = formatTime(breakCounter.count);
        setTime(time2);
        setLabel(breakCounter.label);
      } else {
        const numbers = time2.replace(/:/, '').split('').map((n) => parseInt(n, 10));

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

        time2 = `${numbers[0]}${numbers[1]}:${numbers[2]}${numbers[3]}`;
        setTime(time2);
      }
    }, 1000);
  }

  return (
    <div>
      <CounterDisplay counter={breakCounter} />
      <CounterDisplay counter={sessionCounter} />

      <h1 data-testid="timer-label">{label}</h1>
      <div data-testid="time-left">{time}</div>
      <button type="button" data-testid="start-stop" onClick={() => countDown(time)}>Play</button>
    </div>
  );
}
