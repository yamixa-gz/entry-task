import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import PokemonDetailsModal from './PokemonDetailsModal';

const PokemonDetailsBtn = ({
  url, getPokemonDetailsRequest, isPending, pokemonDetails 
}) => {
  const [isLoading, setLoading] = useState(false);
  const [isModalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (isLoading) {
      getPokemonDetailsRequest(url).then(() => {
        setLoading(false);
      });
    }
  }, [url, isLoading, setLoading, getPokemonDetailsRequest]);
  const onClickHandler = (e) => {
    e.stopPropagation();
    if (isPending) return;
    setModalShow(true);
    setLoading(true);
  };
  return (
    <>
      <Button
        variant="outline-secondary"
        size="sm"
        disabled={isLoading}
        onClick={!isLoading ? onClickHandler : null}
      >
        {isLoading ? 'Loading…' : 'See details'}
      </Button>
      {!isLoading && (
        <PokemonDetailsModal
          pokemonDetails={pokemonDetails}
          show={isModalShow}
          setModalShow={setModalShow}
          onHide={() => setModalShow(false)}
        />
      )}
    </>
  );
};

export default PokemonDetailsBtn;
