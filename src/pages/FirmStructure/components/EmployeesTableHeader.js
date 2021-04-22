import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import s from '../scss/TableHeader.module.scss';
import {
  JOB, NAME, SALARY, SURNAME
} from '../../../constants/firmStructureElements';
import withTranslation from '../../../HOC/withTranslation';
import withAppLanguageConsumer from '../../../HOC/withAppLanguageConsumer';

const EmployeesTableHeader = ({
  appLanguage, getTranslation = () => null, setColumnStyle, sortClickHandler
}) => {
  const defaultAppTranslation = {
    job: 'Job',
    name: 'Name',
    surname: 'Surname',
    salary: 'Salary',
  };
  const appTranslation = getTranslation(appLanguage) || defaultAppTranslation;

  return (
    <tr>
      <th>#</th>
      <th className={s.titleCell} onClick={() => sortClickHandler(JOB)}>
        <span
          className={setColumnStyle(JOB)}
        >
          {appTranslation.job}
        </span>
      </th>
      <th className={s.titleCell} onClick={() => sortClickHandler(NAME)}>
        <span
          className={setColumnStyle(NAME)}
        >
          {appTranslation.name}
        </span>
      </th>
      <th className={s.titleCell} onClick={() => sortClickHandler(SURNAME)}>
        <span
          className={setColumnStyle(SURNAME)}
        >
          {appTranslation.surname}
        </span>
      </th>
      <th className={s.titleCell} onClick={() => sortClickHandler(SALARY)}>
        <span
          className={setColumnStyle(SALARY)}
        >
          {appTranslation.salary}
        </span>
      </th>
    </tr>
  );
};
EmployeesTableHeader.propTypes = {
  appLanguage: PropTypes.string.isRequired,
  getTranslation: PropTypes.func.isRequired,
  setColumnStyle: PropTypes.func.isRequired,
  sortClickHandler: PropTypes.func.isRequired,
};

export default compose(
  withAppLanguageConsumer,
  withTranslation,
)(EmployeesTableHeader);
