import React, { useContext } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import s from '../scss/PokemonDetailsModal.module.scss';
import AvatarHolder from './AvatarHolder';
import Ability from './Ability';
import { FetchedDataTableContext } from '../../../cotexts/FetchedDataTableProvider';
import { ShowPokemonDetailsContext } from '../../../cotexts/ShowPokemonDetailsProvider';

const PokemonDetailsModal = () => {
  const {
    setPokemonDetailsModalShow,
    setLoadedPokemonDetailsImage,
    isPokemonDetailsModalShow,
    isLoadedPokemonDetailsImage,
  } = useContext(ShowPokemonDetailsContext);
  const { state } = useContext(FetchedDataTableContext);
  const { pokemonDetails } = state;

  const abilities = pokemonDetails && pokemonDetails
    .abilities.map((ability) => <Ability key={ability} ability={ability} />);
  return (
    <Modal
      show={isPokemonDetailsModalShow}
      onHide={() => setPokemonDetailsModalShow(false)}
      backdrop="static"
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Pokemon Details:
        </Modal.Title>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setPokemonDetailsModalShow(false);
          }}
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
            onLoad={() => {
              setLoadedPokemonDetailsImage(true);
            }}
          />
          <Card.Body>
            <Card.Title className="text-capitalize fw-bold fs-5">
              {pokemonDetails && pokemonDetails.name}
            </Card.Title>
            <Card.Title className="fw-bold">Abilities:</Card.Title>
            <Card.Text className="text-capitalize">
              {abilities}
            </Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={(e) => {
          e.stopPropagation();
          setPokemonDetailsModalShow(false);
        }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PokemonDetailsModal;
