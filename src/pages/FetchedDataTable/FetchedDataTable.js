import React, { Component } from 'react';
import {
  Table,
  Container,
  Image
} from 'react-bootstrap';
import cloneDeep from 'lodash.clonedeep';
import uuid from 'react-uuid';
import Pagination from 'react-js-pagination';
import MainDataListTableRow from './components/MainDataListTableRow';
import Preloader from './components/Preloader';
import MainDataListTableHeader from './components/MainDataListTableHeader';
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from '../../constants/httpStatusCode';
import Layout from '../../layout/Layout';

const BASE_URL = 'https://pokeapi.co/api/v2/';

class FetchedDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPending: false,
      fetchedDataArr: [],
      pageLimit: 20,
      pagesAmount: 0,
      activePage: 1,
      pokemonDetails: null,

      activeElIndex: -1,
      hotKeyValue: '',
      newFetchedDataArr: [],
      movingElement: {},
      insertingElIndex: -1,
      mouseDownPressed: false,
    };
  }

  componentDidMount() {
    const { activePage } = this.state;
    document.addEventListener('keypress', this.keyPressHandler);
    this.getPageRequest(activePage);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keyPressHandler);
  }

  setPending = (value) => {
    this.setState((state) => ({
      ...state,
      isPending: value,
    }));
  }

  setDataFromServer = (data) => {
    const fetchedDataArr = data.results.map((item, index) => ({
      id: uuid(),
      hotKey: String.fromCharCode(97 + index),
      ...item
    }));
    this.setState((state) => ({
      ...state,
      fetchedDataArr,
      pagesAmount: data.count,
    }));
  }

  setPokemonDetailsData = (data) => {
    const abilities = data.abilities.map((item) => item.ability?.name);
    this.setState((state) => ({
      ...state,
      pokemonDetails: {
        ...state.pokemonDetails,
        id: data.id,
        name: data.species?.name,
        avatarUrl: data.sprites?.front_default,
        abilities,
      }
    }));
  }

  getPokemonDetailsRequest = async (detailsUrl) => {
    this.setPending(true);
    try {
      const response = await fetch(detailsUrl);
      if (response.ok) {
        this.setPokemonDetailsData(await response.json());
        this.setPending(false);
        return;
      }
      this.setPending(false);
      if (response.status === NOT_FOUND) {
        // eslint-disable-next-line no-console
        console.error('Required address don`t exist! :(');
        return;
      }
      if (response.status === INTERNAL_SERVER_ERROR) {
        // eslint-disable-next-line no-console
        console.error('Unexpected server error... :(');
        return;
      }
      // eslint-disable-next-line no-console
      console.error('Unknown error... :(');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }

  getPageRequest = async (pageNumber) => {
    const { pageLimit } = this.state;
    this.setPending(true);
    try {
      const response = await fetch(
        `${BASE_URL}pokemon?limit=${pageLimit}&offset=${pageNumber * pageLimit - pageLimit}`
      );
      if (response.ok) {
        this.setDataFromServer(await response.json());
        this.setState({
          activePage: pageNumber,
          isPending: false
        });
        return;
      }
      this.setPending(false);
      if (response.status === NOT_FOUND) {
        // eslint-disable-next-line no-console
        console.error('Required address don`t exist! :(');
        return;
      }
      if (response.status === INTERNAL_SERVER_ERROR) {
        // eslint-disable-next-line no-console
        console.error('Unexpected server error... :(');
        return;
      }
      // eslint-disable-next-line no-console
      console.error('Unknown error... :(');
    } catch (e) {
      this.setPending(false);
      // eslint-disable-next-line no-console
      console.error('Something went wrong...', e);
    }
  }

  nameCapitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

  pageChangeHandler = (pageNumber) => {
    const { isPending } = this.state;
    if (isPending) return;
    this.getPageRequest(pageNumber);
  }

  keyPressHandler = (e) => {
    const { fetchedDataArr } = this.state;
    this.setState((state) => ({
      ...state,
      hotKeyValue: e.key,
      activeElIndex: fetchedDataArr.findIndex((el) => el.hotKey === e.key)
    }));
  }

  onClickHandler = (index, hotKey) => {
    this.setState((state) => ({
      ...state,
      activeElIndex: index,
      hotKeyValue: hotKey,
    }));
  }

  dragEnterHandler = (index) => {
    this.setState((state) => ({
      ...state,
      insertingElIndex: index
    }));
  }

  mouseDownEventHandler = (index) => {
    const { fetchedDataArr } = this.state;
    const newFetchedDataArr = fetchedDataArr.filter((_, i) => i !== index);
    const movingElement = { ...fetchedDataArr[index] };
    this.setState((state) => ({
      ...state,
      newFetchedDataArr,
      movingElement,
      activeElIndex: index,
      insertingElIndex: index,
      mouseDownPressed: true,
    }));
  }

  mouseUpEventHandler = () => {
    const { newFetchedDataArr, movingElement, insertingElIndex } = this.state;
    const sortedFetchedDataArr = cloneDeep(newFetchedDataArr);

    sortedFetchedDataArr.splice(insertingElIndex, 0, { ...movingElement });
    this.setState((state) => ({
      ...state,
      fetchedDataArr: sortedFetchedDataArr,
      activeElIndex: -1,
      hotKeyValue: '',
      mouseDownPressed: false,
    }));
  }

  render() {
    const {
      fetchedDataArr, activePage, pagesAmount, pokemonDetails,
      activeElIndex, hotKeyValue, pageLimit, isPending, insertingElIndex, mouseDownPressed
    } = this.state;
    const { Header, Footer } = Layout();
    const fetchedDataComponents = fetchedDataArr.map((item, index) => (
      <MainDataListTableRow
        dragEnterHandler={this.dragEnterHandler}
        isActive={item.hotKey === hotKeyValue}
        hotKey={item.hotKey}
        activeElIndex={activeElIndex}
        insertingElIndex={insertingElIndex}
        mouseDownPressed={mouseDownPressed}
        index={index}
        key={item.id}
        url={item.url}
        pokemonDetails={pokemonDetails}
        isPending={isPending}
        name={item.name ? `${this.nameCapitalize(item.name)}; HotKey: ${item.hotKey}` : 'unknown Name'}
        onClickHandler={this.onClickHandler}
        mouseUpEventHandler={this.mouseUpEventHandler}
        mouseDownEventHandler={this.mouseDownEventHandler}
        getPokemonDetailsRequest={this.getPokemonDetailsRequest}
      />
    ));
    return (
      <>
        <Header toggleLanguage={() => {
        }}
        />
        <div className="content">
          <div className="app-container">

            <Container fluid className="bg-light mb-3 pt-3 h-100">
              <div className="middle-container ">
                <div className="d-flex justify-content-center mb-3">
                  <Image
                    src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
                    alt='"PokeApi" image could be here...'
                    onLoad={(e) => setTimeout(() => {
                      // eslint-disable-next-line no-alert
                      alert(`"PokeApi" image loaded successfully, size ${e.target.width}x${e.target.height}`);
                    }, 1000)}
                    onError={() => setTimeout(() => {
                      // eslint-disable-next-line no-alert
                      alert('"PokeApi" image loading crashed...');
                    }, 1000)}
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
                    onChange={this.pageChangeHandler}
                  />
                </div>
              </div>
            </Container>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default FetchedDataTable;
