import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import withTranslation from '../../../HOC/withTranslation';
import withAppLanguageConsumer from '../../../HOC/withAppLanguageConsumer';

const FirmStructureControls = ({
  appLanguage, getTranslation = () => null, setModalShow,
  itemsIdForDelete, removeDataFromFirmStructHandler
}) => {
  const defaultAppTranslation = {
    addButtonName: 'Add',
    removeButtonName: 'Remove'
  };
  const appTranslation = getTranslation(appLanguage) || defaultAppTranslation;

  return (
    <div className="d-grid gap-2 d-md-block">
      <Button
        onClick={() => setModalShow(true)}
        variant="secondary"
      >
        {appTranslation.addButtonName}
      </Button>
      <Button
        onClick={removeDataFromFirmStructHandler}
        variant="secondary"
        className="ms-md-2"
        disabled={!itemsIdForDelete.length}
      >
        {appTranslation.removeButtonName}
      </Button>
    </div>
  );
};
FirmStructureControls.propTypes = {
  appLanguage: PropTypes.string.isRequired,
  getTranslation: PropTypes.func.isRequired,
  setModalShow: PropTypes.func.isRequired,
  itemsIdForDelete: PropTypes.array.isRequired,
  removeDataFromFirmStructHandler: PropTypes.func.isRequired
};

export default compose(
  withAppLanguageConsumer,
  withTranslation,
)(FirmStructureControls);
