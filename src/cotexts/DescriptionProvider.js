import React from 'react';
import useDescription from '../hooks/useDescription';

export const DescriptionContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const DescriptionProvider = ({ children }) => {
  const {
    openCardId,
    setOpenCardId,
    descriptionCards,
  } = useDescription();

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
