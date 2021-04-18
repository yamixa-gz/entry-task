import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/Header/logo.png';
import s from './scss/Header.module.scss';

const Header = () => {
  return (
    <header className={s.header}>
      <div className="app-container">
        <div className={s.headerWrapper}>
          <div className={s.headerContacts}>adress, location and stuff</div>
          <div className={s.headerMenuRow}>
            <div className={s.headerLogo}>
              <img src={logo} alt="logo" />
            </div>
            <nav className={s.headerMenu}>
              <ul className={s.headerNav}>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/task-7">Task-7</Link>
                </li>
                <li>
                  <Link to="/task-9">Task-9</Link>
                </li>
              </ul>
              <button type="button" className={s.headerSearch}> </button>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
