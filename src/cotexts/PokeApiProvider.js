import React from 'react';
import usePokeApi from '../hooks/usePokeApi';

export const PokeApiContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const PokeApiProvider = ({ children }) => {
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
  } = usePokeApi();

  return (
    <PokeApiContext.Provider value={{
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
    </PokeApiContext.Provider>
  );
};
