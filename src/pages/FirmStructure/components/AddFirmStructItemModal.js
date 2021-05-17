import { Modal } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import AddFirmStructItemForm from './AddFirmStructItemForm';
import { setModalShowActionCreator } from '../../../store/firmStructure/actions';

const AddFirmStructItemModal = ({
  callbacks, isModalShow, tableStyle, setModalShow 
}) => {
  const { addDataFromFormToFirmStruct } = callbacks;
  const { t } = useTranslation('FirmStructure');

  return (
    <Modal
      onHide={() => setModalShow(false)}
      show={isModalShow}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" className="fw-bold fs-4 text-secondary">
          {t('Input item to FirmStruct')}
        </Modal.Title>
        <button
          onClick={() => setModalShow(false)}
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </Modal.Header>
      <Modal.Body>
        <AddFirmStructItemForm
          tableStyle={tableStyle}
          setModalShow={setModalShow}
          addDataFromFormToFirmStruct={addDataFromFormToFirmStruct}
        />
      </Modal.Body>
    </Modal>
  );
};

AddFirmStructItemModal.propTypes = {
  callbacks: PropTypes.shape({
    setColumnStyle: PropTypes.func.isRequired,
    addDataFromFormToFirmStruct: PropTypes.func.isRequired,
  }).isRequired,
  isModalShow: PropTypes.bool.isRequired,
  tableStyle: PropTypes.string.isRequired,
  setModalShow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isModalShow: state.firmStructure.isModalShow,
  tableStyle: state.firmStructure.tableStyle,
});
export default connect(mapStateToProps, {
  setModalShow: setModalShowActionCreator,
})(AddFirmStructItemModal);
