import React from 'react';
import logo from '../../assets/images/Header/logo.png';
import s from './scss/Header.module.scss';
import LanguageSwitcher from './components/LanguageSwitcher';
import MenuItem from '../BurgerMenu/components/MenuItem';
import menuItems from '../../data/menuItems';

const Header = () => {
  return (
    <header className={s.header}>
      <div className="app-container">
        <div className={s.headerWrapper}>
          <LanguageSwitcher />
          <div className={s.headerContacts}>
            <div className={s.headerContactsAddress}>address, location and stuff</div>
          </div>
          <div className={s.headerMenuRow}>
            <div className={s.headerLogo}>
              <img src={logo} alt="logo" />
            </div>
            <nav className={s.headerMenu}>
              <ul className={s.headerNav}>
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.href}
                    menuItem={item}
                    toggleBurger={() => null}
                  />
                ))}
              </ul>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button type="button" className={s.headerSearch} />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
