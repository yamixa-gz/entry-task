import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import s from '../scss/TableHeader.module.scss';
import {
  JOB, NAME, SALARY, SURNAME
} from '../../../constants/firmStructureElements';

const EmployeesTableHeader = ({ setColumnStyle, sortClickHandler }) => {
  const { t } = useTranslation(['FirmStructure', 'common']);

  return (
    <tr>
      <th>#</th>
      <th className={s.titleCell} onClick={() => sortClickHandler(JOB)}>
        <span
          className={setColumnStyle(JOB)}
        >
          {t('Job')}
        </span>
      </th>
      <th className={s.titleCell} onClick={() => sortClickHandler(NAME)}>
        <span
          className={setColumnStyle(NAME)}
        >
          {t('common:Name')}
        </span>
      </th>
      <th className={s.titleCell} onClick={() => sortClickHandler(SURNAME)}>
        <span
          className={setColumnStyle(SURNAME)}
        >
          {t('Surname')}
        </span>
      </th>
      <th className={s.titleCell} onClick={() => sortClickHandler(SALARY)}>
        <span
          className={setColumnStyle(SALARY)}
        >
          {t('Salary')}
        </span>
      </th>
    </tr>
  );
};
EmployeesTableHeader.propTypes = {
  setColumnStyle: PropTypes.func.isRequired,
  sortClickHandler: PropTypes.func.isRequired,
};

export default EmployeesTableHeader;
