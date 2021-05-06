import React from 'react';
import PropTypes from 'prop-types';
import useBurger from '../../hooks/useBurger';
import s from './scss/Burger.module.scss';
import BurgerButton from './components/BurgerButton';
import BurgerDropdown from './components/BurgerDropdown';

const BurgerMenu = ({ menuItems }) => {
  const { isShownBurgerMenu, toggleBurger } = useBurger();
  return (
    <>
      <BurgerButton
        toggleBurger={toggleBurger}
        className={isShownBurgerMenu ? `${s.burger} ${s.active}` : `${s.burger}`}
      />
      <BurgerDropdown
        menuItems={menuItems}
        toggleBurger={toggleBurger}
        overlayClassName={isShownBurgerMenu ? `${s.burgerOverlay} ${s.active}` : `${s.burgerOverlay}`}
        className={isShownBurgerMenu ? `${s.burgerDropdown} ${s.active}` : `${s.burgerDropdown}`}
      />
    </>
  );
};

BurgerMenu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  })).isRequired,
};

export default BurgerMenu;
