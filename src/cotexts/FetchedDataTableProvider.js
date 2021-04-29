import React, { useReducer } from 'react';
import {
  SET_PENDING, SET_MOUSE_DOWN_EVENT_DATA, SET_MOUSE_UP_EVENT_DATA, SET_RECEIVED_DATA,
  SET_POKEMON_DETAILS_DATA, SET_ACTIVE_PAGE, SET_HOT_KEY_AND_ACTIVE_INDEX, SET_INSERTING_EL_INDEX,
  initialState, fetchedDataTableReducer
} from '../reducers/fetchedDataTableReducer';

export const FetchedDataTableContext = React.createContext(null);

// eslint-disable-next-line react/prop-types
export const FetchedDataTableProvider = ({ children }) => {
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

  return (
    <FetchedDataTableContext.Provider value={{
      state,
      setPending,
      setReceivedDataFromServer,
      setPokemonDetails,
      setHotKeyAndActiveIndex,
      setInsertingElIndex,
      setDataFromMouseDownEvent,
      setDataFromMouseUpEvent,
      setActivePage,
    }}
    >
      {children}
    </FetchedDataTableContext.Provider>
  );
};
