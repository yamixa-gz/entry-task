import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { setModalShowActionCreator } from '../../../store/firmStructure/actions';

const FirmStructureControls = ({ handlers, itemsIdForDelete, setModalShow }) => {
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
  itemsIdForDelete: PropTypes.arrayOf(PropTypes.string).isRequired,
  setModalShow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  itemsIdForDelete: state.firmStructure.itemsIdForDelete,
});
export default connect(mapStateToProps, {
  setModalShow: setModalShowActionCreator,
})(FirmStructureControls);
