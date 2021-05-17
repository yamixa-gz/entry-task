import { Button } from 'react-bootstrap';
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import PokemonDetailsModal from './PokemonDetailsModal';
import { PokeApiContext } from '../../../cotexts/PokeApiProvider';
import useShowPokemonDetails from '../../../hooks/useShowPokemonDetails';

const PokemonDetailsBtn = ({ url, callbacks }) => {
  const { state } = useContext(PokeApiContext);
  const { t } = useTranslation('PokeApi');
  const { isPending } = state;
  const { getPokemonDetailsRequest } = callbacks;

  const {
    setPokemonDetailsLoading,
    setPokemonDetailsModalShow,
    setLoadedPokemonDetailsImage,
    isPokemonDetailsLoading,
    isPokemonDetailsModalShow,
    isLoadedPokemonDetailsImage,
  } = useShowPokemonDetails();

  useEffect(() => {
    if (isPokemonDetailsLoading) {
      getPokemonDetailsRequest(url).then(() => setPokemonDetailsLoading(false));
    }
  }, [isPokemonDetailsLoading]);
  const onClickHandler = (e) => {
    e.stopPropagation();
    if (isPending) return;
    setPokemonDetailsModalShow(true);
    setPokemonDetailsLoading(true);
  };
  return (
    <>
      <Button
        variant="outline-secondary"
        size="sm"
        disabled={isPokemonDetailsLoading}
        onClick={!isPokemonDetailsLoading ? onClickHandler : null}
      >
        {isPokemonDetailsLoading ? `${t('Loading')}…` : `${t('See details')}`}
      </Button>
      {!isPokemonDetailsLoading && (
        <PokemonDetailsModal
          isPokemonDetailsModalShow={isPokemonDetailsModalShow}
          isLoadedPokemonDetailsImage={isLoadedPokemonDetailsImage}
          setPokemonDetailsModalShow={setPokemonDetailsModalShow}
          setLoadedPokemonDetailsImage={setLoadedPokemonDetailsImage}
        />
      )}
    </>
  );
};

PokemonDetailsBtn.propTypes = {
  url: PropTypes.string.isRequired,
  callbacks: PropTypes.shape({
    nameCapitalize: PropTypes.func.isRequired,
    getPokemonDetailsRequest: PropTypes.func.isRequired,
  }).isRequired,
};

export default PokemonDetailsBtn;
