import React from 'react';
import PropTypes from 'prop-types';

const BurgerButton = ({ className, toggleBurger }) => {
  return (
    <button
      type="button"
      className={className}
      onClick={toggleBurger}
    >
      <span />
    </button>
  );
};
BurgerButton.propTypes = {
  toggleBurger: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default BurgerButton;
