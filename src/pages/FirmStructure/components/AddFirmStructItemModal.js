import {Modal} from 'react-bootstrap'
import React from 'react'
import AddFirmStructItemForm from './AddFirmStructItemForm'
import PropTypes from 'prop-types'
import withTranslation from '../../../HOC/withTranslation'

const AddFirmStructItemModal = ({appLanguage, setModalShow, addDataFromFormToFirmStruct, tableStyle, ...props}) => {
    return (
            <Modal
                    {...props}
                    size='md'
                    aria-labelledby='contained-modal-title-vcenter'
                    centered
            >
                <Modal.Header>
                    <Modal.Title id='contained-modal-title-vcenter' className={'fw-bold fs-4 text-secondary'}>
                      {appLanguage.modalTitle}
                    </Modal.Title>
                    <button onClick={() => setModalShow(false)} type='button' className='btn-close'
                            data-bs-dismiss='modal' aria-label='Close'/>
                </Modal.Header>
                <Modal.Body>
                    <AddFirmStructItemForm
                            setModalShow={setModalShow}
                            addDataFromFormToFirmStruct={addDataFromFormToFirmStruct}
                            tableStyle={tableStyle}
                    />
                </Modal.Body>
            </Modal>
    )
}
AddFirmStructItemModal.propTypes = {
  appLanguage: PropTypes.shape({
    modalTitle: PropTypes.string,
  }),
  tableStyle: PropTypes.string,
  setModalShow: PropTypes.func,
  addDataFromFormToFirmStruct: PropTypes.func
}
AddFirmStructItemModal.defaultProps = {
  appLanguage: {
    modalTitle: 'Input item to FirmStruct',
  }
}

export default withTranslation(AddFirmStructItemModal)