import React from 'react';
import PropTypes from 'prop-types';
import s from '../scss/TableHeader.module.scss';
import {
  JOB, NAME, SALARY, SURNAME
} from '../../../constants/firmStructureElements';
import withTranslation from '../../../HOC/withTranslation';

const EmployeesTableHeader = ({
  getTranslation = () => null, setColumnStyle, sortClickHandler
}) => {
  const defaultAppTranslation = {
    job: 'Job',
    name: 'Name',
    surname: 'Surname',
    salary: 'Salary',
  };
  const appTranslation = getTranslation() || defaultAppTranslation;

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
  getTranslation: PropTypes.func.isRequired,
  setColumnStyle: PropTypes.func.isRequired,
  sortClickHandler: PropTypes.func.isRequired,
};

export default withTranslation(EmployeesTableHeader);
