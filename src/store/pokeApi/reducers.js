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
  SET_RECEIVED_DATA, SET_NEXT_PAGE
} from './types';
import END_OF_NEXT_PAGE from '../../constants/pokeApiElements';

const pokeApiInitialState = {
  isPending: false,
  fetchedDataArr: [],
  pageLimit: 20,
  pagesAmount: 0,
  activePage: 1,
  pokemonDetails: false,
  activeElIndex: -1,
  newFetchedDataArr: [],
  movingElement: {},
  insertingElIndex: -1,
  mouseDownPressed: false,
  nextPage: '',
};

const pokemonDetailsInitialState = {
  isPokemonDetailsLoading: false,
  isPokemonDetailsModalShow: false,
  isLoadedPokemonDetailsImage: false,
  clickedButtonIndex: -1,
};

export const pokeApi = (state = pokeApiInitialState, action) => {
  switch (action.type) {
    case SET_PENDING:
      return { ...state, isPending: action.isPending };

    case SET_RECEIVED_DATA:
      return {
        ...state,
        fetchedDataArr: [...state.fetchedDataArr, ...action.fetchedDataArr],
        pagesAmount: action.pagesAmount,
      };

    case SET_NEXT_PAGE:
      return {
        ...state,
        nextPage: action.nextPage === null ? END_OF_NEXT_PAGE : action.nextPage,
      };

    case SET_POKEMON_DETAILS_DATA:
      return {
        ...state,
        pokemonDetails: { ...action.pokemonDetails }
      };

    case SET_ACTIVE_PAGE:
      return { ...state, activePage: action.activePage };

    case SET_ACTIVE_INDEX:
      return {
        ...state,
        activeElIndex: action.activeElIndex,
      };

    case SET_INSERTING_EL_INDEX:
      return { ...state, insertingElIndex: action.insertingElIndex };

    case SET_MOUSE_DOWN_EVENT_DATA:
      return {
        ...state,
        newFetchedDataArr: action.newFetchedDataArr,
        movingElement: action.movingElement,
        activeElIndex: action.activeElIndex,
        insertingElIndex: action.insertingElIndex,
        mouseDownPressed: true,
      };

    case SET_MOUSE_UP_EVENT_DATA:
      return {
        ...state,
        fetchedDataArr: action.fetchedDataArr,
        activeElIndex: -1,
        hotKeyValue: '',
        mouseDownPressed: false,
      };

    default:
      return state;
  }
};

export const pokemonDetails = (state = pokemonDetailsInitialState, action) => {
  switch (action.type) {
    case SET_POKEMON_DETAILS_LOADING:
      return {
        ...state,
        isPokemonDetailsLoading: action.loadingStatus,
      };

    case SET_POKEMON_DETAILS_MODAL_SHOW:
      return {
        ...state,
        isPokemonDetailsModalShow: action.modalShowStatus,
      };

    case SET_POKEMON_DETAILS_LOADED_IMAGE:
      return {
        ...state,
        isLoadedPokemonDetailsImage: action.loadedImageStatus,
      };

    case SET_CLICKED_BUTTON_INDEX:
      return {
        ...state,
        clickedButtonIndex: action.clickedButtonIndex,
      };

    default:
      return state;
  }
};
