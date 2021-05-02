import { Modal } from 'react-bootstrap';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AddFirmStructItemForm from './AddFirmStructItemForm';
import withTranslation from '../../../HOC/withTranslation';
import { FirmStructureContext } from '../../../cotexts/FirmStructureProvider';

const AddFirmStructItemModal = ({ getTranslation = () => null, callbacks }) => {
  const {
    state,
    setModalShow,
  } = useContext(FirmStructureContext);

  const {
    isModalShow,
    tableStyle,
  } = state;

  const { addDataFromFormToFirmStruct } = callbacks;
  const defaultAppTranslation = {
    modalTitle: 'Input item to FirmStruct',
  };
  const appTranslation = getTranslation() || defaultAppTranslation;
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
          tableStyle={tableStyle}
          setModalShow={setModalShow}
          addDataFromFormToFirmStruct={addDataFromFormToFirmStruct}
        />
      </Modal.Body>
    </Modal>
  );
};

AddFirmStructItemModal.propTypes = {
  getTranslation: PropTypes.func.isRequired,
  callbacks: PropTypes.shape({
    setColumnStyle: PropTypes.func.isRequired,
    addDataFromFormToFirmStruct: PropTypes.func.isRequired,
  }).isRequired,
};

export default withTranslation(AddFirmStructItemModal);
