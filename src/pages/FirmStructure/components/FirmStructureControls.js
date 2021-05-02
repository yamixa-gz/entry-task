import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import withTranslation from '../../../HOC/withTranslation';
import { FirmStructureContext } from '../../../cotexts/FirmStructureProvider';

const FirmStructureControls = ({ getTranslation = () => null, handlers }) => {
  const {
    state,
    setModalShow,
  } = useContext(FirmStructureContext);

  const {
    itemsIdForDelete
  } = state;
  const { removeDataFromFirmStructHandler } = handlers;

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
  handlers: PropTypes.shape({
    sortClickHandler: PropTypes.func.isRequired,
    onMenuItemSelectHandler: PropTypes.func.isRequired,
    removeDataFromFirmStructHandler: PropTypes.func.isRequired,
    onClickTableRowHandler: PropTypes.func.isRequired,
  }).isRequired,
};

export default withTranslation(FirmStructureControls);
