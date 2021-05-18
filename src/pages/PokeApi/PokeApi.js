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
  setHotKeyAndActiveIndexActionCreator,
  setInsertingElIndexActionCreator,
  setPendingActionCreator,
  setPokemonDetailsActionCreator,
  setReceivedDataFromServerActionCreator
} from '../../store/pokeApi/actions';

const BASE_URL = 'https://pokeapi.co/api/v2/';

const PokeApi = ({
  state,
  setPending,
  setReceivedDataFromServer,
  setPokemonDetails,
  setHotKeyAndActiveIndex,
  setInsertingElIndex,
  setDataFromMouseDownEvent,
  setDataFromMouseUpEvent,
  setActivePage,
}) => {
  const setDataFromServer = (data) => {
    const fetchedDataArr = data.results.map((item, index) => ({
      id: uuid(),
      hotKey: String.fromCharCode(97 + index),
      ...item
    }));
    setReceivedDataFromServer(fetchedDataArr, data.count);
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

  const getPageRequest = async (pageNumber) => {
    const { pageLimit } = state;
    setPending(true);
    try {
      const response = await fetch(
        `${BASE_URL}pokemon?limit=${pageLimit}&offset=${pageNumber * pageLimit - pageLimit}`
      );
      if (response.ok) {
        setDataFromServer(await response.json());
        setActivePage(pageNumber);
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

  const keyPressHandler = (e) => {
    const { fetchedDataArr } = state;
    setHotKeyAndActiveIndex(e.key, fetchedDataArr.findIndex((el) => el.hotKey === e.key));
  };

  const onClickHandler = (index, hotKey) => {
    setHotKeyAndActiveIndex(hotKey, index);
  };

  const dragEnterHandler = (index) => setInsertingElIndex(index);

  const mouseDownEventHandler = (index) => {
    const { fetchedDataArr } = state;
    const newFetchedDataArr = fetchedDataArr.filter((_, i) => i !== index);
    const movingElement = { ...fetchedDataArr[index] };
    setDataFromMouseDownEvent(newFetchedDataArr, movingElement, index, index);
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
    keyPressHandler,
    dragEnterHandler,
    mouseDownEventHandler,
    mouseUpEventHandler,
  };
  const callbacks = {
    nameCapitalize,
    getPokemonDetailsRequest,
  };

  useEffect(() => {
    const { activePage } = state;
    document.addEventListener('keypress', keyPressHandler);
    getPageRequest(activePage);
    return () => {
      document.removeEventListener('keypress', keyPressHandler);
    };
  }, []);

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
  }).isRequired,
  setPending: PropTypes.func.isRequired,
  setReceivedDataFromServer: PropTypes.func.isRequired,
  setPokemonDetails: PropTypes.func.isRequired,
  setHotKeyAndActiveIndex: PropTypes.func.isRequired,
  setInsertingElIndex: PropTypes.func.isRequired,
  setDataFromMouseDownEvent: PropTypes.func.isRequired,
  setDataFromMouseUpEvent: PropTypes.func.isRequired,
  setActivePage: PropTypes.func.isRequired,
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
  },
});

export default connect(mapStateToProps, {
  setPending: setPendingActionCreator,
  setReceivedDataFromServer: setReceivedDataFromServerActionCreator,
  setPokemonDetails: setPokemonDetailsActionCreator,
  setHotKeyAndActiveIndex: setHotKeyAndActiveIndexActionCreator,
  setInsertingElIndex: setInsertingElIndexActionCreator,
  setDataFromMouseDownEvent: setDataFromMouseDownEventActionCreator,
  setDataFromMouseUpEvent: setDataFromMouseUpEventActionCreator,
  setActivePage: setActivePageActionCreator,
})(PokeApi);
