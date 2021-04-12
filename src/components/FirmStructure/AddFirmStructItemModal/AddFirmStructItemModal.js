import {Modal} from 'react-bootstrap'
import React from 'react'
import AddFirmStructItemForm from '../AddFirmStructItemForm/AddFirmStructItemForm'

const AddFirmStructItemModal = ({setModalShow, addDataFromFormToFirmStruct, tableStyle, ...props}) => {
    return (
            <Modal
                    {...props}
                    size='md'
                    aria-labelledby='contained-modal-title-vcenter'
                    centered
            >
                <Modal.Header>
                    <Modal.Title id='contained-modal-title-vcenter' className={'fw-bold fs-4 text-secondary'}>
                        Input item to FirmStruct
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

export default AddFirmStructItemModal