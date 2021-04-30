import React from 'react';
import useFirmStructure from '../hooks/useFirmStructure';

export const FirmStructureContext = React.createContext(null);

// eslint-disable-next-line react/prop-types
export const FirmStructContextProvider = ({ children }) => {
  const {
    state,
    setModalShow,
    setSortDirectionByColumn,
    removeDataFromFirmStruct,
    setItemsForDelete,
    setSelectedMenuItem,
    addDataToFirmStruct,
    firmStruct,
  } = useFirmStructure();

  return (
    <FirmStructureContext.Provider value={{
      state,
      setModalShow,
      setSortDirectionByColumn,
      removeDataFromFirmStruct,
      setItemsForDelete,
      setSelectedMenuItem,
      addDataToFirmStruct,
      firmStruct,
    }}
    >
      {children}
    </FirmStructureContext.Provider>
  );
};
