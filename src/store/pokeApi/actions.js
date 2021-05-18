import {
  SET_ACTIVE_PAGE, SET_CLICKED_BUTTON_INDEX,
  SET_HOT_KEY_AND_ACTIVE_INDEX,
  SET_INSERTING_EL_INDEX,
  SET_MOUSE_DOWN_EVENT_DATA,
  SET_MOUSE_UP_EVENT_DATA,
  SET_PENDING,
  SET_POKEMON_DETAILS_DATA,
  SET_POKEMON_DETAILS_LOADED_IMAGE,
  SET_POKEMON_DETAILS_LOADING,
  SET_POKEMON_DETAILS_MODAL_SHOW,
  SET_RECEIVED_DATA
} from './types';

export const setPendingActionCreator = (value) => (dispatch) => dispatch({
  type: SET_PENDING,
  isPending: value,
});

export const setReceivedDataFromServerActionCreator = (fetchedDataArr, pagesAmount) => (dispatch) => dispatch({
  type: SET_RECEIVED_DATA,
  fetchedDataArr,
  pagesAmount,
});

export const setPokemonDetailsActionCreator = ({
  id, name, avatarUrl, abilities
}) => (dispatch) => dispatch({
  type: SET_POKEMON_DETAILS_DATA,
  pokemonDetails: {
    id,
    name,
    avatarUrl,
    abilities,
  },
});

export const setActivePageActionCreator = (activePage) => (dispatch) => dispatch({
  type: SET_ACTIVE_PAGE,
  activePage,
});

export const setHotKeyAndActiveIndexActionCreator = (hotKeyValue, activeElIndex) => (dispatch) => dispatch({
  type: SET_HOT_KEY_AND_ACTIVE_INDEX,
  hotKeyValue,
  activeElIndex,
});

export const setInsertingElIndexActionCreator = (insertingElIndex) => (dispatch) => dispatch({
  type: SET_INSERTING_EL_INDEX,
  insertingElIndex,
});

export const setDataFromMouseDownEventActionCreator = (
  newFetchedDataArr, movingElement, activeElIndex, insertingElIndex
) => (dispatch) => dispatch({
  type: SET_MOUSE_DOWN_EVENT_DATA,
  newFetchedDataArr,
  movingElement,
  activeElIndex,
  insertingElIndex,
});

export const setDataFromMouseUpEventActionCreator = (fetchedDataArr) => (dispatch) => dispatch({
  type: SET_MOUSE_UP_EVENT_DATA,
  fetchedDataArr,
});

export const setPokemonDetailsLoadingActionCreator = (loadingStatus) => (dispatch) => dispatch({
  type: SET_POKEMON_DETAILS_LOADING,
  loadingStatus,
});

export const setPokemonDetailsModalShowActionCreator = (modalShowStatus) => (dispatch) => dispatch({
  type: SET_POKEMON_DETAILS_MODAL_SHOW,
  modalShowStatus,
});

export const setLoadedPokemonDetailsImageActionCreator = (loadedImageStatus) => (dispatch) => dispatch({
  type: SET_POKEMON_DETAILS_LOADED_IMAGE,
  loadedImageStatus,
});

export const setClickedButtonIndexActionCreator = (clickedButtonIndex) => (dispatch) => dispatch({
  type: SET_CLICKED_BUTTON_INDEX,
  clickedButtonIndex,
});
