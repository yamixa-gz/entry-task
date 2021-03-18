import {Modal} from 'react-bootstrap'
import React from 'react'
import AddFirmStructItemForm from './AddFirmStructItemForm'

function AddFirmStructItemModal({setModalShow, addDataToFirmStruct, tableStyle, ...props}) {
    return (
            <Modal
                    {...props}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter" className={'fw-bold fs-4 text-secondary'}>
                        Input item to FirmStruct
                    </Modal.Title>
                    <button onClick={()=>setModalShow(false)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                </Modal.Header>
                <Modal.Body>
                    <AddFirmStructItemForm
                            setModalShow={setModalShow}
                            addDataToFirmStruct={addDataToFirmStruct}
                            tableStyle={tableStyle}
                    />
                </Modal.Body>
            </Modal>
    )
}
export default AddFirmStructItemModal