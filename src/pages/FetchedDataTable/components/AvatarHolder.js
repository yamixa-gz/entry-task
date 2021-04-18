import React from 'react';
import { Card } from 'react-bootstrap';
import noneAvatar from '../../../assets/images/FetchedDataTable/noneAvatar.png';
import s from '../scss/PokemonDetailsModal.module.scss';

const AvatarHolder = ({ visibility = true }) => (
  <Card.Img
    src={noneAvatar}
    alt="Avatar"
    className={visibility ? `${s.size}` : `${s.size} invisible d-none`}
  />
);

export default AvatarHolder;
