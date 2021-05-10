import { useState } from 'react';
import i18n from 'i18next';
import { EN } from '../constants/languages';

const useAppLanguage = () => {
  const [language, setLanguage] = useState(EN);

  const appLanguage = localStorage.getItem('entry-task-app-language') || EN;
  if (appLanguage !== language) setLanguage(appLanguage);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng).then(() => setLanguage(lng));
  };

  return {
    language,
    changeLanguage,
  };
};

export default useAppLanguage;
