import s from './scss/EmployeesTableHeader.module.scss'
import {JOB, NAME, SALARY, SURNAME} from '../../../constants/firmStructureElements'
import React from 'react'
import PropTypes from 'prop-types'
import withTranslation from '../../../HOC/withTranslation'

const EmployeesTableHeader = ({appLanguage, setColumnStyle, sortClickHandler}) =>
    <tr>
      <th>#</th>
      <th className={s.titleCell} onClick={() => sortClickHandler(JOB)}><span
          className={setColumnStyle(JOB)}>{appLanguage.job}</span></th>
      <th className={s.titleCell} onClick={() => sortClickHandler(NAME)}><span
          className={setColumnStyle(NAME)}>{appLanguage.name}</span></th>
      <th className={s.titleCell} onClick={() => sortClickHandler(SURNAME)}><span
          className={setColumnStyle(SURNAME)}>{appLanguage.surname}</span></th>
      <th className={s.titleCell} onClick={() => sortClickHandler(SALARY)}><span
          className={setColumnStyle(SALARY)}>{appLanguage.salary}</span></th>
    </tr>
EmployeesTableHeader.propTypes = {
  appLanguage: PropTypes.shape({
    job: PropTypes.string,
    name: PropTypes.string,
    surname: PropTypes.string,
    salary: PropTypes.string,
  }),
  setColumnStyle: PropTypes.func,
  sortClickHandler: PropTypes.func
}
EmployeesTableHeader.defaultProps = {
  appLanguage: {
    job: 'Job',
    name: 'Name',
    surname: 'Surname',
    salary: 'Salary',
  }
}

export default withTranslation(EmployeesTableHeader)