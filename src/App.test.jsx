import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

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
