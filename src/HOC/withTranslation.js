import React from 'react';
import PropTypes from 'prop-types';
import APP_LANGUAGE from '../translation/appLanguage';
import languages from '../translation/languages';

const withTranslation = (Component) => {
  let appLanguage = null;
  if (!Component.name) {
    throw new Error('Component is not valid!');
  }
  if (!Object.keys(languages).includes(APP_LANGUAGE)) {
    throw new Error('Type of language is not valid!');
  }
  const currentLanguagePack = Object.entries(languages).find((entry) => entry[0] === APP_LANGUAGE)[1];
  if (!Object.keys(currentLanguagePack).includes(Component.name)) {
    // eslint-disable-next-line no-console
    console.error('Component is not recognized!');
  } else {
    [appLanguage] = [Object.entries(currentLanguagePack).find((entry) => entry[0] === Component.name)[1]];
  }
  return (props) => {
    return (
      <Component
          /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...props}
        appLanguage={appLanguage}
      />
    );
  };
};

withTranslation.propTypes = {
  Component: PropTypes.func
};

export default withTranslation;
