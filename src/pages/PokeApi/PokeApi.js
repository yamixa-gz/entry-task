import React, { useEffect } from 'react';
import cloneDeep from 'lodash.clonedeep';
import uuid from 'react-uuid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from '../../constants/httpStatusCode';
import PokeApiView from './PokeApiView';
import {
  setActivePageActionCreator,
  setDataFromMouseDownEventActionCreator,
  setDataFromMouseUpEventActionCreator,
  setActiveIndexActionCreator,
  setInsertingElIndexActionCreator,
  setPendingActionCreator,
  setPokemonDetailsActionCreator,
  setReceivedDataFromServerActionCreator,
  setNextPageFromServerActionCreator,
} from '../../store/pokeApi/actions';
import END_OF_NEXT_PAGE from '../../constants/pokeApiElements';

const BASE_URL = 'https://pokeapi.co/api/v2/';

const PokeApi = ({
  state,
  setPending,
  setReceivedDataFromServer,
  setPokemonDetails,
  setActiveIndex,
  setInsertingElIndex,
  setDataFromMouseDownEvent,
  setDataFromMouseUpEvent,
  setActivePage,
  setNextPageFromServer,
}) => {
  const setDataFromServer = (data) => {
    const fetchedDataArr = data.results.map((item) => ({
      id: uuid(),
      ...item
    }));
    setReceivedDataFromServer(fetchedDataArr, data.count);
    setNextPageFromServer(data.next);
  };

  const setPokemonDetailsData = (data) => {
    const abilities = data.abilities.map((item) => item.ability?.name);

    setPokemonDetails({
      id: data.id,
      name: data.species?.name,
      avatarUrl: data.sprites?.front_default,
      abilities,
    });
  };

  const getPokemonDetailsRequest = async (detailsUrl) => {
    setPending(true);
    try {
      const response = await fetch(detailsUrl);
      if (response.ok) {
        setPokemonDetailsData(await response.json());
        setPending(false);
        return;
      }
      setPending(false);
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
  };

  const getPageRequest = async () => {
    const { pageLimit, activePage, nextPage } = state;
    if (nextPage === END_OF_NEXT_PAGE) return;
    setPending(true);
    try {
      const response = await fetch(
        `${BASE_URL}pokemon?limit=${pageLimit}&offset=${activePage * pageLimit - pageLimit}`
      );
      if (response.ok) {
        const receivedData = await response.json();
        setDataFromServer(receivedData);
        setPending(false);
        return;
      }
      setPending(false);
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
      setPending(false);
      // eslint-disable-next-line no-console
      console.error('Something went wrong...', e);
    }
  };

  const nameCapitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const pageChangeHandler = (pageNumber) => {
    const { isPending } = state;
    if (isPending) return;
    getPageRequest(pageNumber);
  };

  const pokeApiScrollHandler = () => {
    const { isPending, activePage, nextPage } = state;
    if (isPending) return;
    if ((document.documentElement.offsetHeight + 160)
      + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
      if (nextPage !== END_OF_NEXT_PAGE) setActivePage(activePage + 1);
    }
  };

  const onClickHandler = (index) => {
    setActiveIndex(index);
  };

  const dragEnterHandler = (index) => setInsertingElIndex(index);

  const mouseDownEventHandler = (index) => {
    const { fetchedDataArr } = state;
    const newFetchedDataArr = fetchedDataArr.filter((_, i) => i !== index);
    const movingElement = { ...fetchedDataArr[index] };
    setDataFromMouseDownEvent(newFetchedDataArr, movingElement, index);
  };

  const mouseUpEventHandler = () => {
    const { newFetchedDataArr, movingElement, insertingElIndex } = state;
    const sortedFetchedDataArr = cloneDeep(newFetchedDataArr);

    sortedFetchedDataArr.splice(insertingElIndex, 0, { ...movingElement });
    setDataFromMouseUpEvent(sortedFetchedDataArr);
  };
  const handlers = {
    pageChangeHandler,
    onClickHandler,
    dragEnterHandler,
    mouseDownEventHandler,
    mouseUpEventHandler,
  };
  const callbacks = {
    nameCapitalize,
    getPokemonDetailsRequest,
  };

  const { activePage, isPending } = state;
  useEffect(() => {
    if (!isPending) getPageRequest(activePage);
  }, [activePage]);

  useEffect(() => {
    window.addEventListener('scroll', pokeApiScrollHandler);
    return () => {
      window.removeEventListener('scroll', pokeApiScrollHandler);
    };
  });

  return (
    <PokeApiView
      handlers={handlers}
      callbacks={callbacks}
    />
  );
};

PokeApi.propTypes = {
  state: PropTypes.shape({
    isPending: PropTypes.bool.isRequired,
    fetchedDataArr: PropTypes.arrayOf(PropTypes.object),
    pageLimit: PropTypes.number.isRequired,
    activePage: PropTypes.number.isRequired,
    newFetchedDataArr: PropTypes.arrayOf(PropTypes.object),
    movingElement: PropTypes.objectOf(PropTypes.any).isRequired,
    insertingElIndex: PropTypes.number.isRequired,
    nextPage: PropTypes.string.isRequired,
  }).isRequired,
  setPending: PropTypes.func.isRequired,
  setReceivedDataFromServer: PropTypes.func.isRequired,
  setPokemonDetails: PropTypes.func.isRequired,
  setActiveIndex: PropTypes.func.isRequired,
  setInsertingElIndex: PropTypes.func.isRequired,
  setDataFromMouseDownEvent: PropTypes.func.isRequired,
  setDataFromMouseUpEvent: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
  setNextPageFromServer: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  state: {
    isPending: state.pokeApi.isPending,
    fetchedDataArr: state.pokeApi.fetchedDataArr,
    pageLimit: state.pokeApi.pageLimit,
    activePage: state.pokeApi.activePage,
    newFetchedDataArr: state.pokeApi.newFetchedDataArr,
    movingElement: state.pokeApi.movingElement,
    insertingElIndex: state.pokeApi.insertingElIndex,
    nextPage: state.pokeApi.nextPage,
  },
});

export default connect(mapStateToProps, {
  setPending: setPendingActionCreator,
  setReceivedDataFromServer: setReceivedDataFromServerActionCreator,
  setPokemonDetails: setPokemonDetailsActionCreator,
  setActiveIndex: setActiveIndexActionCreator,
  setInsertingElIndex: setInsertingElIndexActionCreator,
  setDataFromMouseDownEvent: setDataFromMouseDownEventActionCreator,
  setDataFromMouseUpEvent: setDataFromMouseUpEventActionCreator,
  setActivePage: setActivePageActionCreator,
  setNextPageFromServer: setNextPageFromServerActionCreator,
})(PokeApi);
