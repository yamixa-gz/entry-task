import s from './scss/BranchesTableHeader.module.scss'
import {TITLE} from '../../../constants/firmStructureElements'
import React from 'react'
import PropTypes from 'prop-types'
import withTranslation from '../../../HOC/withTranslation'

const BranchesTableHeader = ({appLanguage, setColumnStyle, sortClickHandler}) =>
    <tr>
      <th>#</th>
      <th className={s.titleCell} onClick={() => sortClickHandler(TITLE)}><span
          className={setColumnStyle(TITLE)}>{appLanguage.title}</span></th>
    </tr>
BranchesTableHeader.propTypes = {
  appLanguage: PropTypes.shape({
    title: PropTypes.string,
  }),
  setColumnStyle: PropTypes.func,
  sortClickHandler: PropTypes.func
}
BranchesTableHeader.defaultProps = {
  appLanguage: {
    title: 'Title',
  }
}

export default withTranslation(BranchesTableHeader)