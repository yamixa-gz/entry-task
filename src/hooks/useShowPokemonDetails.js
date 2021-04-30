import { useState } from 'react';

const useShowPokemonDetails = () => {
  const [isPokemonDetailsLoading, setPokemonDetailsLoading] = useState(false);
  const [isPokemonDetailsModalShow, setPokemonDetailsModalShow] = useState(false);
  const [isLoadedPokemonDetailsImage, setLoadedPokemonDetailsImage] = useState(false);

  return {
    setPokemonDetailsLoading,
    setPokemonDetailsModalShow,
    setLoadedPokemonDetailsImage,
    isPokemonDetailsLoading,
    isPokemonDetailsModalShow,
    isLoadedPokemonDetailsImage,
  };
};

export default useShowPokemonDetails;
