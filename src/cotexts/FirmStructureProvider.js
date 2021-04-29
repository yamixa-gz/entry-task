import React, { useReducer } from 'react';
import firmStruct from '../data/inputFirmStructData';
import { EMPTY_STRING } from '../constants/firmStructureElements';
import {
  ADD_DATA_TO_FIRM_STRUCT,
  firmStructureReducer,
  initialState,
  IS_MODAL_SHOW,
  REMOVE_DATA_FROM_FIRM_STRUCT, SET_ITEMS_FOR_DELETE, SET_ITEMS_SELECTED_MENU_ITEM,
  SET_SORTING
} from '../reducers/firmStructureReducer';

export const FirmStructContext = React.createContext(null);

// eslint-disable-next-line react/prop-types
export const FirmStructContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(firmStructureReducer, initialState);

  const setModalShow = (isModalShow) => dispatch({
    type: IS_MODAL_SHOW,
    payload: {
      isModalShow,
    },
  });

  const setSortDirectionByColumn = (sortDirection, sortedColumnName) => dispatch({
    type: SET_SORTING,
    payload: {
      sortDirection,
      sortedColumnName,
    }
  });
  const removeDataFromFirmStruct = (showingFirmStructSection) => dispatch({
    type: REMOVE_DATA_FROM_FIRM_STRUCT,
    payload: {
      itemsIdForDelete: [],
      showingFirmStructSection,
    }
  });
  const setItemsForDelete = (itemsIdForDelete) => dispatch({
    type: SET_ITEMS_FOR_DELETE,
    payload: {
      itemsIdForDelete,
    }
  });
  const setSelectedMenuItem = (
    section, setSectionIndex, categoryName, tableStyle, showingFirmStructSection, setSectionValues
  ) => dispatch({
    type: SET_ITEMS_SELECTED_MENU_ITEM,
    payload: {
      sortDirection: EMPTY_STRING,
      sortedColumnName: EMPTY_STRING,
      [`${section}Index`]: setSectionIndex,
      itemsIdForDelete: [],
      ...setSectionValues,
      tableStyle,
      categoryName,
      showingFirmStructSection,
    }
  });
  const addDataToFirmStruct = (showingFirmStructSection) => dispatch({
    type: ADD_DATA_TO_FIRM_STRUCT,
    payload: {
      showingFirmStructSection,
    }
  });

  return (
    <FirmStructContext.Provider value={{
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
    </FirmStructContext.Provider>
  );
};
