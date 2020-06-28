import React from 'react';

import useCounter from './hooks/useCounter';
import CounterDisplay from './components/CounterDisplay';

export default function App() {
  const breakCounter = useCounter(5, 'break');
  const sessionCounter = useCounter(25, 'session');

  return (
    <div>
      <CounterDisplay counter={breakCounter} />
      <CounterDisplay counter={sessionCounter} />

      <h1 data-testid="timer-label">Session</h1>
      <div data-testid="time-left">25:00</div>
    </div>
  );
}
