import React from 'react';
import s from '../scss/Card.module.scss';

const OPEN_CARD = 'Read Less';
const CLOSED_CARD = 'Read More';

const Card = ({
  id, title, description, img, clickHandler, isOpen, makeShortTextForCardContent 
}) => {
  return (
    <div className={s.card}>
      <div className={s.cardBody}>
        <div className={s.cardImg}>
          <img src={img} alt="cvs" />
        </div>
        <div className={s.cardTitle}>
          {title}
        </div>
        <div className={s.cardDescription}>
          {isOpen ? description : makeShortTextForCardContent(description)}
        </div>
        <button
          onClick={() => clickHandler(id)}
          className={s.cardButton}
        >
          {isOpen ? OPEN_CARD : CLOSED_CARD}
        </button>
      </div>
    </div>
  );
};

export default Card;
