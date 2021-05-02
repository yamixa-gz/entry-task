import React from 'react';
import useFetchedDataTable from '../hooks/useFetchedDataTable';

export const FetchedDataTableContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const FetchedDataTableProvider = ({ children }) => {
  const {
    state,
    setPending,
    setReceivedDataFromServer,
    setPokemonDetails,
    setHotKeyAndActiveIndex,
    setInsertingElIndex,
    setDataFromMouseDownEvent,
    setDataFromMouseUpEvent,
    setActivePage,
  } = useFetchedDataTable();

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
