import React from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import s from '../scss/PokemonDetailsModal.module.scss';
import AvatarHolder from './AvatarHolder';
import Ability from './Ability';
import {
  resetPokemonDetails,
  setLoadedPokemonDetailsImage,
  setPokemonDetailsModalShow
} from '../../../store/pokeInfo/actions';

const PokemonDetailsModal = ({
  isPokemonDetailsModalShow, isLoadedPokemonDetailsImage,
  setPokemonDetailsModalShowAction, setLoadedPokemonDetailsImageAction,
  pokemonDetails, resetPokemonDetailsAction
}) => {
  const { t } = useTranslation('PokeInfo');
  const abilities = pokemonDetails && pokemonDetails
    .abilities.map((ability) => <Ability key={ability} ability={ability} />);

  const onCloseHandler = (e) => {
    e.stopPropagation();
    setPokemonDetailsModalShowAction(false);
    resetPokemonDetailsAction();
  };
  return (
    <Modal
      show={isPokemonDetailsModalShow}
      backdrop="static"
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {`${t('Pokemon Details')}:`}
        </Modal.Title>
        <button
          onClick={onCloseHandler}
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </Modal.Header>
      <Modal.Body>
        <Card>
          <AvatarHolder visibility={!isLoadedPokemonDetailsImage} />
          <Card.Img
            src={pokemonDetails && pokemonDetails.avatarUrl}
            alt="Avatar"
            className={!isLoadedPokemonDetailsImage ? `${s.size} invisible d-none` : s.size}
            onLoad={() => setLoadedPokemonDetailsImageAction(true)}
          />
          <Card.Body>
            <Card.Title className="text-capitalize fw-bold fs-5">
              {pokemonDetails && pokemonDetails.name}
            </Card.Title>
            <Card.Title className="fw-bold">{`${t('Abilities')}:`}</Card.Title>
            <Card.Text className="text-capitalize">
              {abilities}
            </Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onCloseHandler}>
          {`${t('Close')}`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

PokemonDetailsModal.propTypes = {
  isPokemonDetailsModalShow: PropTypes.bool.isRequired,
  isLoadedPokemonDetailsImage: PropTypes.bool.isRequired,
  setPokemonDetailsModalShowAction: PropTypes.func.isRequired,
  setLoadedPokemonDetailsImageAction: PropTypes.func.isRequired,
  resetPokemonDetailsAction: PropTypes.func.isRequired,
  pokemonDetails: PropTypes.oneOfType([PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    abilities: PropTypes.arrayOf(PropTypes.string).isRequired,
  }), PropTypes.string]).isRequired,
};

const mapStateToProps = (state) => ({
  pokemonDetails: state.pokeInfo.pokemonDetails,
  isPokemonDetailsModalShow: state.pokemonDetails.isPokemonDetailsModalShow,
  isLoadedPokemonDetailsImage: state.pokemonDetails.isLoadedPokemonDetailsImage,
});

const mapDispatchToProps = {
  setPokemonDetailsModalShowAction: setPokemonDetailsModalShow,
  setLoadedPokemonDetailsImageAction: setLoadedPokemonDetailsImage,
  resetPokemonDetailsAction: resetPokemonDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetailsModal);
