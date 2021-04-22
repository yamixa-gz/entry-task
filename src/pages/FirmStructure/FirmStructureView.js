import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AddFirmStructItemModal from './components/AddFirmStructItemModal';
import FirmStructureMenu from './components/FirmStructureMenu';
import FirmStructureTable from './components/FirmStructureTable';
import FirmStructureControls from './components/FirmStructureControls';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';

const FirmStructureView = ({
  isCategoryDisabled, categoryName, isBranchesDisabled, isSubBranchesDisabled,
  itemsIdForDelete, setModalShow, showingFirmStructSection, tableStyle,
  onClickTableRowHandler, addDataFromFormToFirmStruct, removeDataFromFirmStructHandler,
  onMenuItemSelectHandler, isModalShow, branchesIndex, subBranchesIndex, setColumnStyle,
  sortClickHandler, firmStruct
}) => {
  return (
    <>
      <Header />
      <div className="content">
        <div className="app-container">
          <Container fluid className="bg-light mb-3 pt-3 h-100">
            <div className="middle-container ">

              <FirmStructureMenu
                isCategoryDisabled={isCategoryDisabled}
                isBranchesDisabled={isBranchesDisabled}
                isSubBranchesDisabled={isSubBranchesDisabled}
                onMenuItemSelectHandler={onMenuItemSelectHandler}
                branchesIndex={branchesIndex}
                subBranchesIndex={subBranchesIndex}
                categoryName={categoryName}
                firmStruct={firmStruct}
              />
              <FirmStructureTable
                sortClickHandler={sortClickHandler}
                onClickTableRowHandler={onClickTableRowHandler}
                setColumnStyle={setColumnStyle}
                tableStyle={tableStyle}
                itemsIdForDelete={itemsIdForDelete}
                showingFirmStructSection={showingFirmStructSection}
              />
              <FirmStructureControls
                setModalShow={setModalShow}
                itemsIdForDelete={itemsIdForDelete}
                removeDataFromFirmStructHandler={removeDataFromFirmStructHandler}
              />

            </div>
            <AddFirmStructItemModal
              show={isModalShow}
              setModalShow={setModalShow}
              onHide={() => setModalShow(false)}
              addDataFromFormToFirmStruct={addDataFromFormToFirmStruct}
              tableStyle={tableStyle}
            />
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};
FirmStructureView.propTypes = {
  isCategoryDisabled: PropTypes.bool.isRequired,
  categoryName: PropTypes.string.isRequired,
  isBranchesDisabled: PropTypes.bool.isRequired,
  isSubBranchesDisabled: PropTypes.bool.isRequired,
  itemsIdForDelete: PropTypes.arrayOf(PropTypes.string).isRequired,
  setModalShow: PropTypes.func.isRequired,
  tableStyle: PropTypes.string.isRequired,
  onClickTableRowHandler: PropTypes.func.isRequired,
  addDataFromFormToFirmStruct: PropTypes.func.isRequired,
  removeDataFromFirmStructHandler: PropTypes.func.isRequired,
  onMenuItemSelectHandler: PropTypes.func.isRequired,
  isModalShow: PropTypes.bool.isRequired,
  branchesIndex: PropTypes.number.isRequired,
  subBranchesIndex: PropTypes.number.isRequired,
  setColumnStyle: PropTypes.func.isRequired,
  sortClickHandler: PropTypes.func.isRequired,
  showingFirmStructSection: PropTypes.arrayOf(PropTypes.object).isRequired,
  firmStruct: PropTypes.shape({
    branches: PropTypes.arrayOf(PropTypes.object),
    directors: PropTypes.objectOf(PropTypes.object)
  }).isRequired
};
export default FirmStructureView;
