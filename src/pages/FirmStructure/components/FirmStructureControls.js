import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setModalShow } from '../../../store/firmStructure/actions';

const FirmStructureControls = ({ handlers, itemsIdForDelete, setModalShowAction }) => {
  const { removeDataFromFirmStructHandler } = handlers;
  const { t } = useTranslation('FirmStructure');

  return (
    <div className="d-grid gap-2 d-md-block">
      <Button
        onClick={() => setModalShowAction(true)}
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
  itemsIdForDelete: PropTypes.arrayOf(PropTypes.string).isRequired,
  setModalShowAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  itemsIdForDelete: state.firmStructure.itemsIdForDelete,
});

const mapDispatchToProps = {
  setModalShowAction: setModalShow,
};

export default connect(mapStateToProps, mapDispatchToProps)(FirmStructureControls);
