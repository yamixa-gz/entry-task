import s from './scss/BranchesTableHeader.module.scss'
import {TITLE} from '../../../constants/firmStructureSections'
import React from 'react'

const BranchesTableHeader = ({setColumnStyle, sortClickHandler}) =>
    <tr>
      <th>#</th>
      <th className={s.titleCell} onClick={() => sortClickHandler(TITLE)}><span className={setColumnStyle(TITLE)}>Name</span></th>
    </tr>

export default BranchesTableHeader