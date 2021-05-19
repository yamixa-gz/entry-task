import { Dropdown, DropdownButton } from 'react-bootstrap';
import React, { useContext } from 'react';
import i18n from 'i18next';
import s from '../scss/Header.module.scss';
import { EN, RU, UA } from '../../../constants/languages';
import { AppLanguageContext } from '../../../cotexts/AppLanguageProvider';

const LanguageSwitcher = () => {
  const { changeLanguage } = useContext(AppLanguageContext);

  return (
    <DropdownButton
      className={s.headerWrapperDropdownLang}
      id="dropdown-button-drop"
      size="sm"
      variant="secondary"
      title={i18n.language.toUpperCase()}
    >
      <Dropdown.Item onSelect={() => changeLanguage(EN)} eventKey={EN}>EN</Dropdown.Item>
      <Dropdown.Item onSelect={() => changeLanguage(RU)} eventKey={RU}>RU</Dropdown.Item>
      <Dropdown.Item onSelect={() => changeLanguage(UA)} eventKey={UA}>UA</Dropdown.Item>
    </DropdownButton>
  );
};

export default LanguageSwitcher;
