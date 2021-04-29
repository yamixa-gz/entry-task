import React from 'react';
import PropTypes from 'prop-types';
import s from '../scss/TableHeader.module.scss';
import { TITLE } from '../../../constants/firmStructureElements';
import withTranslation from '../../../HOC/withTranslation';

const BranchesTableHeader = ({
  getTranslation = () => null, setColumnStyle, sortClickHandler
}) => {
  const defaultAppTranslation = {
    title: 'Title'
  };
  const appTranslation = getTranslation() || defaultAppTranslation;

  return (
    <tr>
      <th>#</th>
      <th className={s.titleCell} onClick={() => sortClickHandler(TITLE)}>
        <span
          className={setColumnStyle(TITLE)}
        >
          {appTranslation.title}
        </span>
      </th>
    </tr>
  );
};

BranchesTableHeader.propTypes = {
  getTranslation: PropTypes.func.isRequired,
  setColumnStyle: PropTypes.func.isRequired,
  sortClickHandler: PropTypes.func.isRequired
};

export default withTranslation(BranchesTableHeader);
