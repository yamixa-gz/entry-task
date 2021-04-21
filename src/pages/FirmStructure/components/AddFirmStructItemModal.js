import { Modal } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import AddFirmStructItemForm from './AddFirmStructItemForm';
import withTranslation from '../../../HOC/withTranslation';
import withAppLanguageConsumer from '../../../HOC/withAppLanguageConsumer';

const AddFirmStructItemModal = ({
  appLanguage, getTranslation = () => null, setModalShow,
  addDataFromFormToFirmStruct, tableStyle, onHide, show
}) => {
  const defaultAppTranslation = {
    modalTitle: 'Input item to FirmStruct',
  };
  const appTranslation = getTranslation(appLanguage) || defaultAppTranslation;
  return (
    <Modal
      onHide={onHide}
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" className="fw-bold fs-4 text-secondary">
          {appTranslation.modalTitle}
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
          setModalShow={setModalShow}
          addDataFromFormToFirmStruct={addDataFromFormToFirmStruct}
          tableStyle={tableStyle}
        />
      </Modal.Body>
    </Modal>
  );
};

AddFirmStructItemModal.propTypes = {
  appLanguage: PropTypes.string.isRequired,
  getTranslation: PropTypes.func.isRequired,
  tableStyle: PropTypes.string.isRequired,
  setModalShow: PropTypes.func.isRequired,
  addDataFromFormToFirmStruct: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default compose(
  withAppLanguageConsumer,
  withTranslation,
)(AddFirmStructItemModal);
