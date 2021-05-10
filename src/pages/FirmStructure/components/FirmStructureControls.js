import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FirmStructureContext } from '../../../cotexts/FirmStructureProvider';

const FirmStructureControls = ({ handlers }) => {
  const {
    state,
    setModalShow,
  } = useContext(FirmStructureContext);

  const {
    itemsIdForDelete
  } = state;
  const { removeDataFromFirmStructHandler } = handlers;
  const { t } = useTranslation('FirmStructure');

  return (
    <div className="d-grid gap-2 d-md-block">
      <Button
        onClick={() => setModalShow(true)}
        variant="secondary"
      >
        {t('Add')}
      </Button>
      <Button
        onClick={removeDataFromFirmStructHandler}
        variant="secondary"
        className="ms-md-2"
        disabled={!itemsIdForDelete.length}
      >
        {t('Remove')}
      </Button>
    </div>
  );
};
FirmStructureControls.propTypes = {
  handlers: PropTypes.shape({
    sortClickHandler: PropTypes.func.isRequired,
    onMenuItemSelectHandler: PropTypes.func.isRequired,
    removeDataFromFirmStructHandler: PropTypes.func.isRequired,
    onClickTableRowHandler: PropTypes.func.isRequired,
  }).isRequired,
};

export default FirmStructureControls;
