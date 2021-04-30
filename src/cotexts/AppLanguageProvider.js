import React from 'react';
import useAppLanguage from '../hooks/useAppLanguage';

export const AppLanguageContext = React.createContext(null);

// eslint-disable-next-line react/prop-types
export const AppLanguageProvider = ({ children }) => {
  const {
    language,
    toggleLanguage,
  } = useAppLanguage();
  return (
    <AppLanguageContext.Provider value={{
      language,
      toggleLanguage,
    }}
    >
      {children}
    </AppLanguageContext.Provider>
  );
};
