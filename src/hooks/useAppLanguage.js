import { useState } from 'react';
import { EN } from '../constants/firmStructureElements';

const useAppLanguage = () => {
  const [language, setLanguage] = useState(EN);

  const toggleLanguage = (currentLanguage) => {
    setLanguage(() => currentLanguage);
  };

  return {
    language,
    toggleLanguage,
  };
};

export default useAppLanguage;
