import {Button} from 'react-bootstrap'
import React from 'react'

const FirmStructureControls = ({setModalShow, itemsIdForDelete, removeDataFromFirmStructHandler}) => {
  return <div className='d-grid gap-2 d-md-block'>
    <Button onClick={() => setModalShow(true)}
            variant='secondary'
    >Добавить</Button>
    <Button onClick={removeDataFromFirmStructHandler}
            variant='secondary'
            className='ms-md-2'
            disabled={!itemsIdForDelete.length}
    >Удалить</Button>
  </div>
}

export default FirmStructureControls