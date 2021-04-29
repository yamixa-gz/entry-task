import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import withTranslation from '../../../HOC/withTranslation';

const FirmStructureControls = ({
  getTranslation = () => null, setModalShow,
  itemsIdForDelete, removeDataFromFirmStructHandler
}) => {
  const defaultAppTranslation = {
    addButtonName: 'Add',
    removeButtonName: 'Remove'
  };
  const appTranslation = getTranslation() || defaultAppTranslation;

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
  getTranslation: PropTypes.func.isRequired,
  setModalShow: PropTypes.func.isRequired,
  itemsIdForDelete: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeDataFromFirmStructHandler: PropTypes.func.isRequired
};

export default withTranslation(FirmStructureControls);
