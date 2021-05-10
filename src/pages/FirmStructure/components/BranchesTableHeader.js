import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import s from '../scss/TableHeader.module.scss';
import { TITLE } from '../../../constants/firmStructureElements';

const BranchesTableHeader = ({ setColumnStyle, sortClickHandler }) => {
  const { t } = useTranslation('FirmStructure');

  return (
    <tr>
      <th>#</th>
      <th className={s.titleCell} onClick={() => sortClickHandler(TITLE)}>
        <span
          className={setColumnStyle(TITLE)}
        >
          {t('Title')}
        </span>
      </th>
    </tr>
  );
};

BranchesTableHeader.propTypes = {
  setColumnStyle: PropTypes.func.isRequired,
  sortClickHandler: PropTypes.func.isRequired
};

export default BranchesTableHeader;
