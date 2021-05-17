import React from 'react';
import { useTranslation } from 'react-i18next';

const MainDataListTableHeader = () => {
  const { t } = useTranslation(['PokeApi', 'common']);

  return (
    <tr>
      <th><span>{`${t('common:Name')}:`}</span></th>
      <th><span>{`${t('Description')}:`}</span></th>
    </tr>
  );
};

export default MainDataListTableHeader;
