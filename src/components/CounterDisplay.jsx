import React from 'react';
import PropTypes from 'prop-types';

export default function CounterDisplay({ counter }) {
  const {
    count,
    variant,
    decrement,
    increment,
    label,
  } = counter;

  return (
    <>
      <h1 data-testid={`${variant}-label`}>{`${label} Length`}</h1>
      <button type="button" data-testid={`${variant}-decrement`} onClick={decrement}>down</button>
      <div data-testid={`${variant}-length`}>{count}</div>
      <button type="button" data-testid={`${variant}-increment`} onClick={increment}>up</button>
    </>
  );
}

CounterDisplay.propTypes = {
  counter: PropTypes.shape({
    count: PropTypes.number.isRequired,
    variant: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    decrement: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired,
  }),
};

CounterDisplay.defaultProps = {
  counter: {
    count: 0,
    variant: '',
    label: '',
    decrement: () => {},
    increment: () => {},
  },
};
