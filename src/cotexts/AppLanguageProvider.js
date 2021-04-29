import React, { useState } from 'react';
import { EN } from '../constants/firmStructureElements';

export const AppLanguageContext = React.createContext(null);

// eslint-disable-next-line react/prop-types
export const AppLanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(EN);

  const toggleLanguage = (currentLanguage) => {
    setLanguage(() => currentLanguage);
  };

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
