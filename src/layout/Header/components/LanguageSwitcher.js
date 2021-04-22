import { Dropdown, DropdownButton } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import s from '../scss/Header.module.scss';
import { EN, RU } from '../../../constants/firmStructureElements';

const LanguageSwitcher = ({ appLanguage, toggleLanguage }) => (
  <DropdownButton
    className={s.headerWrapperDropdownLang}
    id="dropdown-button-drop"
    size="sm"
    variant="secondary"
    title={appLanguage}
  >
    <Dropdown.Item onSelect={toggleLanguage} eventKey={EN}>EN</Dropdown.Item>
    <Dropdown.Item onSelect={toggleLanguage} eventKey={RU}>RU</Dropdown.Item>
  </DropdownButton>
);
LanguageSwitcher.propTypes = {
  appLanguage: PropTypes.string.isRequired,
  toggleLanguage: PropTypes.func.isRequired,
};

export default LanguageSwitcher;
