import { Button } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PokemonDetailsModal from './PokemonDetailsModal';
import {
  getPokemonDetails,
  setClickedButtonIndex,
  setLoadedPokemonDetailsImage,
  setPokemonDetailsModalShow,
} from '../../../store/pokeInfo/actions';

const PokemonDetailsBtn = ({
  url, isPending, isPokemonDetailsLoading,
  setLoadedPokemonDetailsImageAction, getPokemonDetailsAction,
  setPokemonDetailsModalShowAction, index, setClickedButtonIndexAction,
  clickedButtonIndex,
}) => {
  const { t } = useTranslation('PokeInfo');
  const onClickHandler = (e) => {
    e.stopPropagation();
    if (isPending) return;
    setClickedButtonIndexAction(index);
    setPokemonDetailsModalShowAction(true);
    setLoadedPokemonDetailsImageAction(false);
    getPokemonDetailsAction(url);
  };

  return (
    <>
      <Button
        variant="outline-secondary"
        size="sm"
        disabled={isPokemonDetailsLoading}
        onClick={!isPokemonDetailsLoading ? onClickHandler : null}
      >
        {isPokemonDetailsLoading && (clickedButtonIndex === index) ? `${t('Loading')}…` : `${t('See details')}`}
      </Button>
      {(clickedButtonIndex === index) && !isPokemonDetailsLoading && <PokemonDetailsModal /> }
    </>
  );
};

PokemonDetailsBtn.propTypes = {
  index: PropTypes.number.isRequired,
  clickedButtonIndex: PropTypes.number.isRequired,
  isPokemonDetailsLoading: PropTypes.bool.isRequired,
  getPokemonDetailsAction: PropTypes.func.isRequired,
  setPokemonDetailsModalShowAction: PropTypes.func.isRequired,
  setLoadedPokemonDetailsImageAction: PropTypes.func.isRequired,
  setClickedButtonIndexAction: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  isPending: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isPokemonDetailsLoading: state.pokemonDetails.isPokemonDetailsLoading,
  clickedButtonIndex: state.pokemonDetails.clickedButtonIndex,
  isPending: state.pokeInfo.isPending,
});

const mapDispatchToProps = {
  setClickedButtonIndexAction: setClickedButtonIndex,
  setPokemonDetailsModalShowAction: setPokemonDetailsModalShow,
  setLoadedPokemonDetailsImageAction: setLoadedPokemonDetailsImage,
  getPokemonDetailsAction: getPokemonDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetailsBtn);
