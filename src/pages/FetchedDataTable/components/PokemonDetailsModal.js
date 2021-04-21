import React, { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import s from '../scss/PokemonDetailsModal.module.scss';
import AvatarHolder from './AvatarHolder';
import Ability from './Ability';

const PokemonDetailsModal = ({
  isLoading, pokemonDetails, setModalShow, ...props
}) => {
  const [isLoadedMainImage, setLoadedMainImage] = useState(false);
  const abilities = pokemonDetails && pokemonDetails.abilities.map((ability) => <Ability key={ability} ability={ability} />);

  return (
    <Modal
      {...props}
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
            setModalShow(false);
          }}
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </Modal.Header>
      <Modal.Body>
        <Card>
          <AvatarHolder visibility={!isLoadedMainImage} />
          <Card.Img
            src={pokemonDetails && pokemonDetails.avatarUrl}
            alt="Avatar"
            className={!isLoadedMainImage ? `${s.size} invisible d-none` : s.size}
            onLoad={() => {
              setLoadedMainImage(true);
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
          setModalShow(false);
        }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default PokemonDetailsModal;
