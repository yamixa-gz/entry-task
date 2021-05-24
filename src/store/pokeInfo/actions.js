import uuid from 'react-uuid';
import {
  SET_ACTIVE_PAGE, SET_CLICKED_BUTTON_INDEX,
  SET_ACTIVE_INDEX,
  SET_INSERTING_EL_INDEX,
  SET_MOUSE_DOWN_EVENT_DATA,
  SET_MOUSE_UP_EVENT_DATA,
  SET_PENDING,
  SET_POKEMON_DETAILS_DATA,
  SET_POKEMON_DETAILS_LOADED_IMAGE,
  SET_POKEMON_DETAILS_LOADING,
  SET_POKEMON_DETAILS_MODAL_SHOW,
  SET_PAGE_PORTION_DATA, RESET_POKEMON_DETAILS,
} from './types';
import { END_OF_NEXT_PAGE } from '../../constants/pokeInfoElements';
import pokeInfoApi from '../../services/pokeInfoApi';
import { HTTP_OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from '../../constants/httpStatusCode';

const setPending = (value) => ({
  type: SET_PENDING,
  isPending: value,
});

const setPagePortionData = (data, fetchedDataArr) => ({
  type: SET_PAGE_PORTION_DATA,
  pagesAmount: data.count,
  nextPage: data.next === null ? END_OF_NEXT_PAGE : data.next,
  fetchedDataArr,
});

const setPokemonDetailsLoading = (loadingStatus) => ({
  type: SET_POKEMON_DETAILS_LOADING,
  loadingStatus,
});

export const setPokemonDetailsLoadingStatusTrue = () => (dispatch) => dispatch({
  type: SET_POKEMON_DETAILS_LOADING,
  loadingStatus: true,
});

const setPokemonDetails = (id, name, avatarUrl, abilities) => ({
  type: SET_POKEMON_DETAILS_DATA,
  pokemonDetails: {
    id,
    name,
    avatarUrl,
    abilities,
  },
});

export const resetPokemonDetails = () => (dispatch) => dispatch({ type: RESET_POKEMON_DETAILS });

export const setActivePage = (activePage) => (dispatch) => dispatch({
  type: SET_ACTIVE_PAGE,
  activePage,
});

export const setActiveIndex = (activeElIndex) => (dispatch) => dispatch({
  type: SET_ACTIVE_INDEX,
  activeElIndex,
});

export const setInsertingElIndex = (insertingElIndex) => (dispatch) => dispatch({
  type: SET_INSERTING_EL_INDEX,
  insertingElIndex,
});

export const setDataFromMouseDownEvent = (
  newFetchedDataArr, movingElement, index
) => (dispatch) => dispatch({
  type: SET_MOUSE_DOWN_EVENT_DATA,
  newFetchedDataArr,
  movingElement,
  activeElIndex: index,
  insertingElIndex: index,
});

export const setDataFromMouseUpEvent = (fetchedDataArr) => (dispatch) => dispatch({
  type: SET_MOUSE_UP_EVENT_DATA,
  fetchedDataArr,
});

export const setPokemonDetailsModalShow = (modalShowStatus) => (dispatch) => dispatch({
  type: SET_POKEMON_DETAILS_MODAL_SHOW,
  modalShowStatus,
});

export const setLoadedPokemonDetailsImage = (loadedImageStatus) => (dispatch) => dispatch({
  type: SET_POKEMON_DETAILS_LOADED_IMAGE,
  loadedImageStatus,
});

export const setClickedButtonIndex = (clickedButtonIndex) => (dispatch) => dispatch({
  type: SET_CLICKED_BUTTON_INDEX,
  clickedButtonIndex,
});

export const getPokemonDetails = (detailsUrl) => (dispatch) => {
  dispatch(setPending(true));
  dispatch(setPokemonDetailsLoading(true));
  pokeInfoApi.getPokemonDetailsRequest(detailsUrl).then((response) => {
    switch (response.status) {
      case HTTP_OK:
        response.json().then((data) => {
          const abilities = data.abilities.map((item) => item.ability?.name);
          dispatch(
            setPokemonDetails(data.id, data.species?.name, data.sprites?.front_default, abilities)
          );
        })
          .catch((e) => {
            // eslint-disable-next-line no-console
            console.error('Something went wrong with JSON parse...', e);
          });
        break;

      case NOT_FOUND:
        // eslint-disable-next-line no-console
        console.error('Required address don`t exist! :(');
        break;

      case INTERNAL_SERVER_ERROR:
        // eslint-disable-next-line no-console
        console.error('Unexpected server error... :(');
        break;

      default:
        // eslint-disable-next-line no-console
        console.error('Unknown error... :(');
    }
  })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error('Something went wrong...', e);
    })
    .finally(() => {
      dispatch(setPending(false));
      dispatch(setPokemonDetailsLoading(false));
    });
};

export const getPage = (activePage, pageLimit, nextPage) => (dispatch) => {
  if (nextPage === END_OF_NEXT_PAGE) return;
  dispatch(setPending(true));
  pokeInfoApi.getPageRequest(activePage, pageLimit).then((response) => {
    switch (response.status) {
      case HTTP_OK:
        response.json().then((data) => {
          const fetchedDataArr = data.results.map((item) => ({ id: uuid(), ...item }));
          dispatch(setPagePortionData(data, fetchedDataArr));
        })
          .catch((e) => {
            // eslint-disable-next-line no-console
            console.error('Something went wrong with JSON parse...', e);
          });
        break;

      case NOT_FOUND:
        // eslint-disable-next-line no-console
        console.error('Required address don`t exist! :(');
        break;

      case INTERNAL_SERVER_ERROR:
        // eslint-disable-next-line no-console
        console.error('Unexpected server error... :(');
        break;

      default:
        // eslint-disable-next-line no-console
        console.error('Unknown error... :(');
    }
  })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error('Something went wrong...', e);
    })
    .finally(() => dispatch(setPending(false)));
};
