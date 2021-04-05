import React from 'react'
import s from './scss/arrowDirection.module.scss'
import {JOB, NAME, SALARY, SURNAME} from './constants'
const TITLE = 'title'
const EmployeesTableHeader = ({setColumnStyle, sortClickHandler}) =>
    <tr>
      <th>#</th>
      <th className={s.titleCell} onClick={() => sortClickHandler(JOB)}><span className={setColumnStyle(JOB)}>Job</span></th>
      <th className={s.titleCell} onClick={() => sortClickHandler(NAME)}><span className={setColumnStyle(NAME)}>Name</span></th>
      <th className={s.titleCell} onClick={() => sortClickHandler(SURNAME)}><span className={setColumnStyle(SURNAME)}>Surname</span></th>
      <th className={s.titleCell} onClick={() => sortClickHandler(SALARY)}><span className={setColumnStyle(SALARY)}>Salary</span></th>
    </tr>

const BranchesTableHeader = ({setColumnStyle, sortClickHandler}) =>
    <tr>
      <th>#</th>
      <th className={s.titleCell} onClick={() => sortClickHandler(TITLE)}><span className={setColumnStyle(TITLE)}>Name</span></th>
    </tr>

const useTableComponents = {
  EmployeesTableHeader,
  BranchesTableHeader,
}
export default useTableComponents