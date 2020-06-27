import React, { useState } from 'react';

export default function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);

  const decrementBreakLength = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const incrementBreakLength = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const decrementSessionLength = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
    }
  };

  const incrementSessionLength = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
    }
  };

  return (
    <div>
      <h1 data-testid="break-label">Break Length</h1>
      <button type="button" data-testid="break-decrement" onClick={decrementBreakLength}>down</button>
      <div data-testid="break-length">{breakLength}</div>
      <button type="button" data-testid="break-increment" onClick={incrementBreakLength}>up</button>

      <h1 data-testid="session-label">Session Length</h1>
      <button type="button" data-testid="session-decrement" onClick={decrementSessionLength}>down</button>
      <div data-testid="session-length">{sessionLength}</div>
      <button type="button" data-testid="session-increment" onClick={incrementSessionLength}>up</button>

      <h1 data-testid="timer-label">Session</h1>
      <div data-testid="time-left">25:00</div>
    </div>
  );
}
