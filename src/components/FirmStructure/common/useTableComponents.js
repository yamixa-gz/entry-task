import React from 'react'
import s from './scss/arrowDirection.module.scss'
const EmployeesTableHeader = ({setColumnStyle, sortClickHandler}) =>
    <tr>
      <th>#</th>
      <th className={s.titleCell} onClick={() => sortClickHandler('job')}><span className={setColumnStyle('job')}>Job</span></th>
      <th className={s.titleCell} onClick={() => sortClickHandler('name')}><span className={setColumnStyle('name')}>Name</span></th>
      <th className={s.titleCell} onClick={() => sortClickHandler('surname')}><span className={setColumnStyle('surname')}>Surname</span></th>
      <th className={s.titleCell} onClick={() => sortClickHandler('salary')}><span className={setColumnStyle('salary')}>Salary</span></th>
    </tr>
const BranchesTableHeader = ({setColumnStyle, sortClickHandler}) =>
    <tr>
      <th>#</th>
      <th className={s.titleCell} onClick={() => sortClickHandler('title')}><span className={setColumnStyle('title')}>Name</span></th>
    </tr>

const useTableComponents = {
  EmployeesTableHeader,
  BranchesTableHeader,
}
export default useTableComponents