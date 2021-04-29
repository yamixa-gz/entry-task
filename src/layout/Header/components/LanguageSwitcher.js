import { Dropdown, DropdownButton } from 'react-bootstrap';
import React, { useContext } from 'react';
import s from '../scss/Header.module.scss';
import { EN, RU } from '../../../constants/firmStructureElements';
import { AppLanguageContext } from '../../../cotexts/AppLanguageProvider';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useContext(AppLanguageContext);
  return (
    <DropdownButton
      className={s.headerWrapperDropdownLang}
      id="dropdown-button-drop"
      size="sm"
      variant="secondary"
      title={language}
    >
      <Dropdown.Item onSelect={toggleLanguage} eventKey={EN}>EN</Dropdown.Item>
      <Dropdown.Item onSelect={toggleLanguage} eventKey={RU}>RU</Dropdown.Item>
    </DropdownButton>
  );
};

export default LanguageSwitcher;
