import { useReducer } from 'react';
import {
  fetchedDataTableReducer,
  initialState,
  SET_ACTIVE_PAGE,
  SET_HOT_KEY_AND_ACTIVE_INDEX,
  SET_INSERTING_EL_INDEX,
  SET_MOUSE_DOWN_EVENT_DATA,
  SET_MOUSE_UP_EVENT_DATA,
  SET_PENDING,
  SET_POKEMON_DETAILS_DATA,
  SET_RECEIVED_DATA
} from '../reducers/fetchedDataTableReducer';

const useFetchedDataTable = () => {
  const [state, dispatch] = useReducer(fetchedDataTableReducer, initialState);

  const setPending = (value) => dispatch({
    type: SET_PENDING,
    payload: {
      isPending: value,
    },
  });

  const setReceivedDataFromServer = (fetchedDataArr, pagesAmount) => dispatch({
    type: SET_RECEIVED_DATA,
    payload: {
      fetchedDataArr,
      pagesAmount,
    },
  });

  const setPokemonDetails = ({
    id, name, avatarUrl, abilities
  }) => dispatch({
    type: SET_POKEMON_DETAILS_DATA,
    payload: {
      id,
      name,
      avatarUrl,
      abilities,
    },
  });

  const setActivePage = (activePage) => dispatch({
    type: SET_ACTIVE_PAGE,
    payload: {
      activePage,
    },
  });

  const setHotKeyAndActiveIndex = (hotKeyValue, activeElIndex) => dispatch({
    type: SET_HOT_KEY_AND_ACTIVE_INDEX,
    payload: {
      hotKeyValue,
      activeElIndex,
    },
  });

  const setInsertingElIndex = (insertingElIndex) => dispatch({
    type: SET_INSERTING_EL_INDEX,
    payload: {
      insertingElIndex,
    },
  });

  const setDataFromMouseDownEvent = (
    newFetchedDataArr, movingElement, activeElIndex, insertingElIndex
  ) => dispatch({
    type: SET_MOUSE_DOWN_EVENT_DATA,
    payload: {
      newFetchedDataArr,
      movingElement,
      activeElIndex,
      insertingElIndex,
      mouseDownPressed: true,
    },
  });

  const setDataFromMouseUpEvent = (fetchedDataArr) => dispatch({
    type: SET_MOUSE_UP_EVENT_DATA,
    payload: {
      fetchedDataArr,
      activeElIndex: -1,
      hotKeyValue: '',
      mouseDownPressed: false,
    },
  });

  return {
    state,
    setPending,
    setReceivedDataFromServer,
    setPokemonDetails,
    setHotKeyAndActiveIndex,
    setInsertingElIndex,
    setDataFromMouseDownEvent,
    setDataFromMouseUpEvent,
    setActivePage,
  };
};

export default useFetchedDataTable;
