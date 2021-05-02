import React from 'react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AddFirmStructItemModal from './components/AddFirmStructItemModal';
import FirmStructureMenu from './components/FirmStructureMenu';
import FirmStructureTable from './components/FirmStructureTable';
import FirmStructureControls from './components/FirmStructureControls';
import Layout from '../../layout/Layout';

const FirmStructureView = ({ handlers, callbacks, showingFirmStructSection }) => {
  const { Header, Footer } = Layout();
  return (
    <>
      <Header />
      <div className="content">
        <div className="app-container">
          <Container fluid className="bg-light mb-3 pt-3 h-100">
            <div className="middle-container ">

              <FirmStructureMenu
                handlers={handlers}
              />
              <FirmStructureTable
                handlers={handlers}
                callbacks={callbacks}
                showingFirmStructSection={showingFirmStructSection}
              />
              <FirmStructureControls
                handlers={handlers}
              />

            </div>
            <AddFirmStructItemModal
              callbacks={callbacks}
            />
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};
FirmStructureView.propTypes = {
  handlers: PropTypes.shape({
    sortClickHandler: PropTypes.func.isRequired,
    onMenuItemSelectHandler: PropTypes.func.isRequired,
    removeDataFromFirmStructHandler: PropTypes.func.isRequired,
    onClickTableRowHandler: PropTypes.func.isRequired,
  }).isRequired,
  callbacks: PropTypes.shape({
    setColumnStyle: PropTypes.func.isRequired,
    addDataFromFormToFirmStruct: PropTypes.func.isRequired,
  }).isRequired,
  showingFirmStructSection: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default FirmStructureView;
