import { useState } from 'react';
import cardDescription from '../data/cardDescription';

const useDescription = () => {
  const [openCardId, setId] = useState(null);
  const setOpenCardId = (id) => setId((prevOpenCardId) => (prevOpenCardId === id ? null : id));
  return {
    openCardId,
    setOpenCardId,
    descriptionCards: cardDescription,
  };
};

export default useDescription;
