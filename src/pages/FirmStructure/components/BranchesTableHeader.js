import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import s from '../scss/TableHeader.module.scss';
import { TITLE } from '../../../constants/firmStructureElements';
import withTranslation from '../../../HOC/withTranslation';
import withAppLanguageConsumer from '../../../HOC/withAppLanguageConsumer';

const BranchesTableHeader = ({
  appLanguage, getTranslation = () => null, setColumnStyle, sortClickHandler
}) => {
  const defaultAppTranslation = {
    title: 'Title'
  };
  const appTranslation = getTranslation(appLanguage) || defaultAppTranslation;

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
  appLanguage: PropTypes.string.isRequired,
  getTranslation: PropTypes.func.isRequired,
  setColumnStyle: PropTypes.func.isRequired,
  sortClickHandler: PropTypes.func.isRequired
};

export default compose(
  withAppLanguageConsumer,
  withTranslation,
)(BranchesTableHeader);
