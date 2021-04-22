import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
  }, [isLoading]);
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
PokemonDetailsBtn.propTypes = {
  url: PropTypes.string.isRequired,
  getPokemonDetailsRequest: PropTypes.func.isRequired,
  isPending: PropTypes.bool.isRequired,
  pokemonDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    abilities: PropTypes.arrayOf(PropTypes.string),
  }),
};

PokemonDetailsBtn.defaultProps = {
  pokemonDetails: {
    id: 0,
    name: '',
    avatarUrl: '',
    abilities: [],
  }
};

export default PokemonDetailsBtn;
