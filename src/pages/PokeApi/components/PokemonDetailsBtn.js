import { Button } from 'react-bootstrap';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PokemonDetailsModal from './PokemonDetailsModal';
import {
  setClickedButtonIndexActionCreator,
  setLoadedPokemonDetailsImageActionCreator,
  setPokemonDetailsLoadingActionCreator,
  setPokemonDetailsModalShowActionCreator
} from '../../../store/pokeApi/actions';

const PokemonDetailsBtn = ({
  url, isPending, callbacks, isLoadedPokemonDetailsImage,
  isPokemonDetailsLoading, isPokemonDetailsModalShow,
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
      {(clickedButtonIndex === index) && !isPokemonDetailsLoading && (
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
  index: PropTypes.number.isRequired,
  clickedButtonIndex: PropTypes.number.isRequired,
  isPokemonDetailsLoading: PropTypes.bool.isRequired,
  isPokemonDetailsModalShow: PropTypes.bool.isRequired,
  isLoadedPokemonDetailsImage: PropTypes.bool.isRequired,
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
  isPokemonDetailsModalShow: state.pokemonDetails.isPokemonDetailsModalShow,
  isLoadedPokemonDetailsImage: state.pokemonDetails.isLoadedPokemonDetailsImage,
  clickedButtonIndex: state.pokemonDetails.clickedButtonIndex,
  resetPokemonDetailsObject: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, {
  setPokemonDetailsLoading: setPokemonDetailsLoadingActionCreator,
  setPokemonDetailsModalShow: setPokemonDetailsModalShowActionCreator,
  setLoadedPokemonDetailsImage: setLoadedPokemonDetailsImageActionCreator,
  setClickedButtonIndex: setClickedButtonIndexActionCreator,
})(PokemonDetailsBtn);
