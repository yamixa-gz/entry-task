import React, { useState } from 'react';

export const ShowPokemonDetailsContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const ShowPokemonDetailsProvider = ({ children }) => {
  const [isPokemonDetailsLoading, setPokemonDetailsLoading] = useState(false);
  const [isPokemonDetailsModalShow, setPokemonDetailsModalShow] = useState(false);
  const [isLoadedPokemonDetailsImage, setLoadedPokemonDetailsImage] = useState(false);

  return (
    <ShowPokemonDetailsContext.Provider value={{
      setPokemonDetailsLoading,
      setPokemonDetailsModalShow,
      setLoadedPokemonDetailsImage,
      isPokemonDetailsLoading,
      isPokemonDetailsModalShow,
      isLoadedPokemonDetailsImage,
    }}
    >
      {children}
    </ShowPokemonDetailsContext.Provider>
  );
};
