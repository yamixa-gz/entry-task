import React from 'react';
import useAppLanguage from '../hooks/useAppLanguage';

export const AppLanguageContext = React.createContext(null);

// eslint-disable-next-line react/prop-types
export const AppLanguageProvider = ({ children }) => {
  const {
    language,
    changeLanguage,
  } = useAppLanguage();
  return (
    <AppLanguageContext.Provider value={{
      language,
      changeLanguage,
    }}
    >
      {children}
    </AppLanguageContext.Provider>
  );
};
