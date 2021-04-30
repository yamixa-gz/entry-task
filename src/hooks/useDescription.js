import { useState } from 'react';
import descriptionCards from '../data/descriptionCards';

const useDescription = () => {
  const [openCardId, setId] = useState(null);
  const setOpenCardId = (id) => setId((prevOpenCardId) => (prevOpenCardId === id ? null : id));
  return {
    openCardId,
    setOpenCardId,
    descriptionCards,
  };
};

export default useDescription;
