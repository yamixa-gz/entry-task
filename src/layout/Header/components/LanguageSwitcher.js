import {Dropdown, DropdownButton} from "react-bootstrap";
import s from "../scss/Header.module.scss";
import {EN, RU} from "../../../constants/firmStructureElements";
import React from "react";

const LanguageSwitcher = ({appLanguage, toggleLanguage}) =>
    <DropdownButton
        className={s.headerWrapperDropdownLang}
        id={`dropdown-button-drop`}
        size="sm"
        variant="secondary"
        title={appLanguage}
    >
      <Dropdown.Item onSelect={toggleLanguage} eventKey={EN}>EN</Dropdown.Item>
      <Dropdown.Item onSelect={toggleLanguage} eventKey={RU}>RU</Dropdown.Item>
    </DropdownButton>

export default LanguageSwitcher;