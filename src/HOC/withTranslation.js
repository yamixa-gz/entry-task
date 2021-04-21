import React from 'react';
import PropTypes from 'prop-types';
import languages from '../translation/languages';
import {EN} from "../constants/firmStructureElements";

const withTranslation = Component => {
  if (!Component.name) {
    throw new Error('Component is not valid!');
  }
  const getTranslation = (lang = EN) => {
    if (!languages[lang]) return null
    const currentLanguagePack = languages[lang];
    if (!currentLanguagePack[Component.name]) return null
    return currentLanguagePack[Component.name];
  }

  return (props) => {
    return (
        <Component
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...props}
            getTranslation={getTranslation}
        />
    );
  };
};

withTranslation.propTypes = {
  Component: PropTypes.func
};

export default withTranslation;
