import { Button } from 'react-bootstrap';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PokemonDetailsModal from './PokemonDetailsModal';
import {
  setClickedButtonIndexActionCreator, setLoadedPokemonDetailsImageActionCreator,
  setPokemonDetailsLoadingActionCreator, setPokemonDetailsModalShowActionCreator,
} from '../../../store/pokeApi/actions';

const PokemonDetailsBtn = ({
  url, isPending, callbacks, isPokemonDetailsLoading,
  setLoadedPokemonDetailsImage, setPokemonDetailsLoading,
  setPokemonDetailsModalShow, index, setClickedButtonIndex,
  clickedButtonIndex,
}) => {
  const { t } = useTranslation('PokeApi');
  const { getPokemonDetailsRequest } = callbacks;

  useEffect(() => {
    if (isPokemonDetailsLoading && (clickedButtonIndex === index)) {
      getPokemonDetailsRequest(url).then(() => setPokemonDetailsLoading(false));
    }
  }, [isPokemonDetailsLoading]);
  const onClickHandler = (e) => {
    e.stopPropagation();
    if (isPending) return;
    setClickedButtonIndex(index);
    setPokemonDetailsModalShow(true);
    setPokemonDetailsLoading(true);
    setLoadedPokemonDetailsImage(false);
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
  setPokemonDetailsLoading: PropTypes.func.isRequired,
  setPokemonDetailsModalShow: PropTypes.func.isRequired,
  setLoadedPokemonDetailsImage: PropTypes.func.isRequired,
  setClickedButtonIndex: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  isPending: PropTypes.bool.isRequired,
  callbacks: PropTypes.shape({
    nameCapitalize: PropTypes.func.isRequired,
    getPokemonDetailsRequest: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  isPokemonDetailsLoading: state.pokemonDetails.isPokemonDetailsLoading,
  clickedButtonIndex: state.pokemonDetails.clickedButtonIndex,
  isPending: state.pokeApi.isPending,
});

export default connect(mapStateToProps, {
  setPokemonDetailsLoading: setPokemonDetailsLoadingActionCreator,
  setClickedButtonIndex: setClickedButtonIndexActionCreator,
  setPokemonDetailsModalShow: setPokemonDetailsModalShowActionCreator,
  setLoadedPokemonDetailsImage: setLoadedPokemonDetailsImageActionCreator,
})(PokemonDetailsBtn);
