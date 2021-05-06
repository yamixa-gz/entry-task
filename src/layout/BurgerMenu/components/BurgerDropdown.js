import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

const BurgerDropdown = ({
  className, overlayClassName, toggleBurger, menuItems
}) => {
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className={overlayClassName} onClick={() => toggleBurger(false)} />
      <ul className={className}>
        {menuItems.map((item) => (
          <MenuItem
            key={item.href}
            menuItem={item}
            toggleBurger={toggleBurger}
          />
        ))}
      </ul>
    </>
  );
};

BurgerDropdown.propTypes = {
  className: PropTypes.string.isRequired,
  overlayClassName: PropTypes.string.isRequired,
  toggleBurger: PropTypes.func.isRequired,
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  })).isRequired,
};

export default BurgerDropdown;
