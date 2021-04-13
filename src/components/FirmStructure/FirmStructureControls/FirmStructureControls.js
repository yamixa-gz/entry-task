import React from 'react'
import {Button} from 'react-bootstrap'
import PropTypes from 'prop-types'
import withTranslation from '../../../HOC/withTranslation'

const FirmStructureControls = ({appLanguage, setModalShow, itemsIdForDelete, removeDataFromFirmStructHandler}) => {
  return <div className='d-grid gap-2 d-md-block'>
    <Button onClick={() => setModalShow(true)}
            variant='secondary'
    >{appLanguage.addButtonName}</Button>
    <Button onClick={removeDataFromFirmStructHandler}
            variant='secondary'
            className='ms-md-2'
            disabled={!itemsIdForDelete.length}
    >{appLanguage.removeButtonName}</Button>
  </div>
}
FirmStructureControls.propTypes = {
  appLanguage: PropTypes.shape({
    addButtonName: PropTypes.string,
    removeButtonName: PropTypes.string
  }),
  setModalShow: PropTypes.func,
  itemsIdForDelete: PropTypes.array,
  removeDataFromFirmStructHandler: PropTypes.func
}
FirmStructureControls.defaultProps = {
  appLanguage: {
    addButtonName: 'Add',
    removeButtonName: 'Remove'
  }
}

export default withTranslation(FirmStructureControls)

