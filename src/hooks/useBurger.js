import { useState } from 'react';

const useBurger = () => {
  const [isShownBurgerMenu, setShownBurgerMenu] = useState(false);
  const toggleBurger = (value) => {
    if (value === false) {
      setShownBurgerMenu(false);
      return;
    }
    setShownBurgerMenu((prev) => !prev);
  };
  return {
    isShownBurgerMenu,
    toggleBurger,
  };
};
export default useBurger;
