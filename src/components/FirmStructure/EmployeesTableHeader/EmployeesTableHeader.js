import s from './scss/EmployeesTableHeader.module.scss'
import {JOB, NAME, SALARY, SURNAME} from '../../../constants/firmStructureSections'
import React from 'react'

const EmployeesTableHeader = ({setColumnStyle, sortClickHandler}) =>
    <tr>
      <th>#</th>
      <th className={s.titleCell} onClick={() => sortClickHandler(JOB)}><span className={setColumnStyle(JOB)}>Job</span></th>
      <th className={s.titleCell} onClick={() => sortClickHandler(NAME)}><span className={setColumnStyle(NAME)}>Name</span></th>
      <th className={s.titleCell} onClick={() => sortClickHandler(SURNAME)}><span className={setColumnStyle(SURNAME)}>Surname</span></th>
      <th className={s.titleCell} onClick={() => sortClickHandler(SALARY)}><span className={setColumnStyle(SALARY)}>Salary</span></th>
    </tr>

export default EmployeesTableHeader