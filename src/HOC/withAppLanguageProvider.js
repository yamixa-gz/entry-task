import React from 'react';
import AppLanguageContext from '../translation/appLanguageContext';

const withAppLanguageProvider = (context) => (Component) => (props) => (
  <AppLanguageContext.Provider value={context}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...props} />
  </AppLanguageContext.Provider>
);

export default withAppLanguageProvider;
