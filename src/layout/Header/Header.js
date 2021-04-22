import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../assets/images/Header/logo.png';
import s from './scss/Header.module.scss';
import { EN } from '../../constants/firmStructureElements';
import withAppLanguageConsumer from '../../HOC/withAppLanguageConsumer';
import LanguageSwitcher from './components/LanguageSwitcher';

const Header = ({ appLanguage, toggleLanguage }) => {
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
                  <Link to="/task-11">Task-11</Link>
                </li>
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
Header.propTypes = {
  appLanguage: PropTypes.string,
  toggleLanguage: PropTypes.func.isRequired,
};
Header.defaultProps = {
  appLanguage: EN,
};

export default withAppLanguageConsumer(Header);
