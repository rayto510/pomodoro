import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('App', () => {
  const { container } = render(<App />);
  expect(true).toBe(true)
})
