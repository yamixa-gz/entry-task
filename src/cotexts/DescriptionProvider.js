import React, { useState } from 'react';
import descriptionCards from '../data/descriptionCards';

export const DescriptionContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const DescriptionProvider = ({ children }) => {
  const [openCardId, setId] = useState(null);
  const setOpenCardId = (id) => setId(() => (openCardId === id ? null : id));
  return (
    <DescriptionContext.Provider value={{
      openCardId,
      setOpenCardId,
      descriptionCards,
    }}
    >
      {children}
    </DescriptionContext.Provider>
  );
};
