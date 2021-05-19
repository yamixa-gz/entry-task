import React from 'react';
import i18n from 'i18next';

export const AppLanguageContext = React.createContext(null);

// eslint-disable-next-line react/prop-types
export const AppLanguageProvider = ({ children }) => {
  return (
    <AppLanguageContext.Provider value={{
      changeLanguage: (lng) => i18n.changeLanguage(lng),
    }}
    >
      {children}
    </AppLanguageContext.Provider>
  );
};
