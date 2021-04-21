import React from 'react';
import {Container} from 'react-bootstrap';
import AddFirmStructItemModal from './components/AddFirmStructItemModal';
import FirmStructureMenu from './components/FirmStructureMenu';
import FirmStructureTable from './components/FirmStructureTable';
import FirmStructureControls from './components/FirmStructureControls';
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";

const FirmStructureView = ({
                             isCategoryDisabled, categoryName, isBranchesDisabled, isSubBranchesDisabled,
                             itemsIdForDelete, setModalShow, showingFirmStructSection, tableStyle,
                             onClickTableRowHandler, addDataFromFormToFirmStruct, removeDataFromFirmStructHandler,
                             onMenuItemSelectHandler, isModalShow, branchesIndex, subBranchesIndex, setColumnStyle,
                             sortClickHandler, firmStruct, appLanguage, toggleLanguage
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
        <Footer/>
      </>
  );
};

export default FirmStructureView
