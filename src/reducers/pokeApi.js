export const SET_PENDING = 'SET_PENDING';
export const SET_RECEIVED_DATA = 'SET_RECEIVED_DATA';
export const SET_POKEMON_DETAILS_DATA = 'SET_POKEMON_DETAILS_DATA';
export const SET_HOT_KEY_AND_ACTIVE_INDEX = 'SET_HOT_KEY_AND_ACTIVE_INDEX';
export const SET_INSERTING_EL_INDEX = 'SET_INSERTING_EL_INDEX';
export const SET_MOUSE_DOWN_EVENT_DATA = 'SET_MOUSE_DOWN_EVENT_DATA';
export const SET_MOUSE_UP_EVENT_DATA = 'SET_MOUSE_UP_EVENT_DATA';
export const SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE';

export const initialState = {
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

export const pokeApi = (state, action) => {
  switch (action.type) {
    case SET_PENDING:
      return { ...state, ...action.payload };

    case SET_RECEIVED_DATA:
      return { ...state, ...action.payload };

    case SET_POKEMON_DETAILS_DATA:
      return { ...state, pokemonDetails: { ...action.payload } };

    case SET_HOT_KEY_AND_ACTIVE_INDEX:
      return { ...state, ...action.payload };

    case SET_INSERTING_EL_INDEX:
      return { ...state, ...action.payload };

    case SET_MOUSE_DOWN_EVENT_DATA:
      return { ...state, ...action.payload };

    case SET_MOUSE_UP_EVENT_DATA:
      return { ...state, ...action.payload };

    case SET_ACTIVE_PAGE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
