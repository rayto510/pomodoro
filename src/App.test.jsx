import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  jest.useFakeTimers();
});

test('break length', () => {
  const { getByRole } = render(<App />);
  expect(getByRole('heading', { name: /^Break Length$/ })).toBeInTheDocument();
});

test('session length', () => {
  const { getByRole } = render(<App />);
  expect(getByRole('heading', { name: /^Session Length$/ })).toBeInTheDocument();
});

test('break decrement button', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('break-decrement')).toHaveTextContent('down');
});

test('break increment button', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('break-increment')).toHaveTextContent('up');
});

test('session decrement button', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('session-decrement')).toHaveTextContent('down');
});

test('session increment button', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('session-increment')).toHaveTextContent('up');
});

test('break length display', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('break-length')).toHaveTextContent('5');

  fireEvent.click(getByTestId('break-decrement'));
  expect(getByTestId('break-length')).toHaveTextContent('4');
  fireEvent.click(getByTestId('break-decrement'));
  expect(getByTestId('break-length')).toHaveTextContent('3');

  fireEvent.click(getByTestId('break-increment'));
  expect(getByTestId('break-length')).toHaveTextContent('4');
  fireEvent.click(getByTestId('break-increment'));
  expect(getByTestId('break-length')).toHaveTextContent('5');
});

test('break length display should not go below 0', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('break-length')).toHaveTextContent('5');

  for (let i = 5; i > 1; i -= 1) {
    fireEvent.click(getByTestId('break-decrement'));
  }
  expect(getByTestId('break-length')).toHaveTextContent('1');

  fireEvent.click(getByTestId('break-decrement'));
  expect(getByTestId('break-length')).toHaveTextContent('1');
});

test('break length display should not go above 60', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('break-length')).toHaveTextContent('5');

  for (let i = 5; i < 60; i += 1) {
    fireEvent.click(getByTestId('break-increment'));
  }
  expect(getByTestId('break-length')).toHaveTextContent('60');

  fireEvent.click(getByTestId('break-increment'));
  expect(getByTestId('break-length')).toHaveTextContent('60');
});

test('session length display', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('session-length')).toHaveTextContent('25');

  fireEvent.click(getByTestId('session-decrement'));
  expect(getByTestId('session-length')).toHaveTextContent('24');
  fireEvent.click(getByTestId('session-decrement'));
  expect(getByTestId('session-length')).toHaveTextContent('23');

  fireEvent.click(getByTestId('session-increment'));
  expect(getByTestId('session-length')).toHaveTextContent('24');
  fireEvent.click(getByTestId('session-increment'));
  expect(getByTestId('session-length')).toHaveTextContent('25');
});

test('session length display should not go below 0', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('session-length')).toHaveTextContent('25');

  for (let i = 25; i > 1; i -= 1) {
    fireEvent.click(getByTestId('session-decrement'));
  }
  expect(getByTestId('session-length')).toHaveTextContent('1');

  fireEvent.click(getByTestId('session-decrement'));
  expect(getByTestId('session-length')).toHaveTextContent('1');
});

test('session length display should not go above 60', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('session-length')).toHaveTextContent('5');

  for (let i = 25; i < 60; i += 1) {
    fireEvent.click(getByTestId('session-increment'));
  }
  expect(getByTestId('session-length')).toHaveTextContent('60');

  fireEvent.click(getByTestId('session-increment'));
  expect(getByTestId('session-length')).toHaveTextContent('60');
});

test('timer label', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('timer-label')).toHaveTextContent('Session');
});

test('time left', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('time-left')).toHaveTextContent('25:00');
});

test('start-stop button', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('start-stop')).toBeInTheDocument();
});

test('countdown', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('time-left')).toHaveTextContent('25:00');
  expect(getByTestId('timer-label')).toHaveTextContent('Session');

  fireEvent.click(getByTestId('start-stop'));

  act(() => jest.advanceTimersByTime(1000));
  expect(getByTestId('time-left')).toHaveTextContent('24:59');

  act(() => jest.advanceTimersByTime(1000));
  expect(getByTestId('time-left')).toHaveTextContent('24:58');

  act(() => jest.advanceTimersByTime(1000));
  expect(getByTestId('time-left')).toHaveTextContent('24:57');

  act(() => jest.advanceTimersByTime(897000));
  expect(getByTestId('time-left')).toHaveTextContent('10:00');

  act(() => jest.advanceTimersByTime(1000));
  expect(getByTestId('time-left')).toHaveTextContent('09:59');

  act(() => jest.advanceTimersByTime(539000));
  expect(getByTestId('time-left')).toHaveTextContent('01:00');

  act(() => jest.advanceTimersByTime(1000));
  expect(getByTestId('time-left')).toHaveTextContent('00:59');

  act(() => jest.advanceTimersByTime(59000));
  expect(getByTestId('time-left')).toHaveTextContent('00:00');
  expect(getByTestId('timer-label')).toHaveTextContent('Session');

  act(() => jest.advanceTimersByTime(1000));
  expect(getByTestId('time-left')).toHaveTextContent('05:00');
  expect(getByTestId('timer-label')).toHaveTextContent('Break');

  act(() => jest.advanceTimersByTime(1000));
  expect(getByTestId('time-left')).toHaveTextContent('04:59');

  act(() => jest.advanceTimersByTime(299000));
  expect(getByTestId('time-left')).toHaveTextContent('00:00');
  expect(getByTestId('timer-label')).toHaveTextContent('Break');

  act(() => jest.advanceTimersByTime(1000));
  expect(getByTestId('time-left')).toHaveTextContent('25:00');
  expect(getByTestId('timer-label')).toHaveTextContent('Session');
});
