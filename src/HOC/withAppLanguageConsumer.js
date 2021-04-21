import React from 'react';
import AppLanguageContext from '../translation/appLanguageContext';

const withAppLanguageConsumer = (Component) => (props) => (
  <AppLanguageContext.Consumer>
    {({ appLanguage, toggleLanguage }) => (
      <Component
        appLanguage={appLanguage}
        toggleLanguage={toggleLanguage}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...props}
      />
    )}
  </AppLanguageContext.Consumer>
);

export default withAppLanguageConsumer;
