import React, { useContext } from 'react';
import {
  Table,
  Container,
  Image
} from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import PropTypes from 'prop-types';
import MainDataListTableRow from './components/MainDataListTableRow';
import Preloader from './components/Preloader';
import MainDataListTableHeader from './components/MainDataListTableHeader';
import Layout from '../../layout/Layout';
import { FetchedDataTableContext } from '../../cotexts/FetchedDataTableProvider';

const FetchedDataTableView = ({ callbacks, handlers }) => {
  const { Header, Footer } = Layout();
  const { nameCapitalize } = callbacks;
  const { pageChangeHandler } = handlers;
  const { state } = useContext(FetchedDataTableContext);
  const {
    fetchedDataArr, hotKeyValue, isPending, pageLimit, pagesAmount, activePage
  } = state;
  const fetchedDataComponents = fetchedDataArr.map((item, index) => (
    <MainDataListTableRow
      handlers={handlers}
      callbacks={callbacks}
      isActive={item.hotKey === hotKeyValue}
      hotKey={item.hotKey}
      index={index}
      key={item.id}
      url={item.url}
      name={item.name ? `${nameCapitalize(item.name)}; HotKey: ${item.hotKey}` : 'unknown Name'}
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
                  alt='"PokeApi" image could be here...'
                  onLoad={(e) => setTimeout(
                    // eslint-disable-next-line no-alert
                    () => alert(`"PokeApi" image loaded successfully, size ${e.target.width}x${e.target.height}`), 1000
                  )}
                  // eslint-disable-next-line no-alert
                  onError={() => setTimeout(() => alert('"PokeApi" image loading crashed...'), 1000)}
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
                <Pagination
                  itemClass="page-item"
                  linkClass="page-link"
                  innerClass="pagination justify-content-center"
                  itemsCountPerPage={pageLimit}
                  totalItemsCount={pagesAmount}
                  pageRangeDisplayed={5}
                  activePage={activePage}
                  onChange={pageChangeHandler}
                />
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Footer />
    </>
  );
};

FetchedDataTableView.propTypes = {
  handlers: PropTypes.shape({
    pageChangeHandler: PropTypes.func.isRequired,
    onClickHandler: PropTypes.func.isRequired,
    keyPressHandler: PropTypes.func.isRequired,
    dragEnterHandler: PropTypes.func.isRequired,
    mouseDownEventHandler: PropTypes.func.isRequired,
    mouseUpEventHandler: PropTypes.func.isRequired,
  }).isRequired,
  callbacks: PropTypes.shape({
    nameCapitalize: PropTypes.func.isRequired,
    getPokemonDetailsRequest: PropTypes.func.isRequired,
  }).isRequired,
};

export default FetchedDataTableView;
