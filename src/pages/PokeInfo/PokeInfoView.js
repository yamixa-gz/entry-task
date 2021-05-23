import React from 'react';
import {
  Table,
  Container,
  Image
} from 'react-bootstrap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainDataListTableRow from './components/MainDataListTableRow';
import Preloader from './components/Preloader';
import MainDataListTableHeader from './components/MainDataListTableHeader';
import Layout from '../../layout/Layout';

const PokeInfoView = ({
  callbacks, handlers, fetchedDataArr, isPending, activeElIndex
}) => {
  const { Header, Footer } = Layout();
  const { nameCapitalize } = callbacks;
  const fetchedDataComponents = fetchedDataArr.map((item, index) => (
    <MainDataListTableRow
      handlers={handlers}
      isActive={index === activeElIndex}
      index={index}
      key={item.id}
      url={item.url}
      name={item.name ? `${nameCapitalize(item.name)}; ` : 'unknown Name'}
    />
  ));

  return (
    <>
      <Header />
      <div className="content">
        <div className="app-container">
          <Container fluid className="bg-light mb-3 pt-3 h-100">
            <div className="middle-container ">
              <div className="d-flex justify-content-center mb-3">
                <Image
                  src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
                  alt='"PokeInfo" image could be here...'
                  onLoad={(e) => setTimeout(
                    // eslint-disable-next-line no-alert
                    () => alert(`"PokeInfo" image loaded successfully, size ${e.target.width}x${e.target.height}`), 1000
                  )}
                  // eslint-disable-next-line no-alert
                  onError={() => setTimeout(() => alert('"PokeInfo" image loading crashed...'), 1000)}
                />
              </div>
              <Table className="mb-5" striped bordered hover>
                <thead>
                  <MainDataListTableHeader />
                </thead>
                <tbody>
                  {fetchedDataComponents}
                </tbody>
              </Table>
              <div className="position-relative">
                {isPending && <Preloader />}
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};

PokeInfoView.propTypes = {
  handlers: PropTypes.shape({
    onClickHandler: PropTypes.func.isRequired,
    dragEnterHandler: PropTypes.func.isRequired,
    mouseUpEventHandler: PropTypes.func.isRequired,
    mouseDownEventHandler: PropTypes.func.isRequired,
  }).isRequired,
  callbacks: PropTypes.shape({
    nameCapitalize: PropTypes.func.isRequired,
  }).isRequired,
  isPending: PropTypes.bool.isRequired,
  fetchedDataArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeElIndex: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => ({
  isPending: state.pokeInfo.isPending,
  fetchedDataArr: state.pokeInfo.fetchedDataArr,
  activeElIndex: state.pokeInfo.activeElIndex,
});

export default connect(mapStateToProps)(PokeInfoView);
