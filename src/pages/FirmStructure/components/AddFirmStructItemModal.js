import { Modal } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import AddFirmStructItemForm from './AddFirmStructItemForm';
import withTranslation from '../../../HOC/withTranslation';

const AddFirmStructItemModal = ({
  appLanguage, setModalShow, addDataFromFormToFirmStruct, tableStyle, ...props 
}) => {
  return (
    <Modal
   /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" className="fw-bold fs-4 text-secondary">
          {appLanguage.modalTitle}
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
  appLanguage: PropTypes.shape({
    modalTitle: PropTypes.string,
  }),
  tableStyle: PropTypes.string.isRequired,
  setModalShow: PropTypes.func.isRequired,
  addDataFromFormToFirmStruct: PropTypes.func.isRequired
};
AddFirmStructItemModal.defaultProps = {
  appLanguage: {
    modalTitle: 'Input item to FirmStruct',
  }
};

export default withTranslation(AddFirmStructItemModal);
