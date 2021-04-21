import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/images/Header/logo.png';
import s from './scss/Header.module.scss';
import {EN} from '../../constants/firmStructureElements'
import withAppLanguageConsumer from '../../HOC/withAppLanguageConsumer';
import LanguageSwitcher from './components/LanguageSwitcher';

const Header = ({appLanguage = EN, toggleLanguage}) => {
  return (
      <header className={s.header}>
        <div className="app-container">
          <div className={s.headerWrapper}>
            <LanguageSwitcher
                appLanguage={appLanguage}
                toggleLanguage={toggleLanguage}
            />
            <div className={s.headerContacts}>adress, location and stuff</div>
            <div className={s.headerMenuRow}>
              <div className={s.headerLogo}>
                <img src={logo} alt="logo"/>
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
                    <Link to="/task-11">Task-11</Link>
                  </li>
                </ul>
                <button type="button" className={s.headerSearch}/>
              </nav>
            </div>
          </div>
        </div>
      </header>
  );
};

export default withAppLanguageConsumer(Header);
