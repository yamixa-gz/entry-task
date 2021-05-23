import {
  ADD_DATA_TO_FIRM_STRUCT,
  SET_IS_MODAL_SHOW, MODIFY_BRANCHES, MODIFY_EMPLOYEES, MODIFY_SUB_BRANCHES,
  REMOVE_DATA_FROM_FIRM_STRUCT,
  SET_ITEMS_FOR_DELETE, SET_ITEMS_SELECTED_MENU_ITEM,
  SET_SORTING
} from './types';

export const setModalShow = (isModalShow) => (dispatch) => dispatch({
  type: SET_IS_MODAL_SHOW,
  isModalShow,
});

export const setSortDirectionByColumn = (sortDirection, sortedColumnName) => (dispatch) => dispatch({
  type: SET_SORTING,
  sortDirection,
  sortedColumnName,
});
export const removeDataFromFirmStruct = (showingFirmStructSection) => (dispatch) => dispatch({
  type: REMOVE_DATA_FROM_FIRM_STRUCT,
  showingFirmStructSection,
});
export const setItemsForDelete = (itemsIdForDelete) => (dispatch) => dispatch({
  type: SET_ITEMS_FOR_DELETE,
  itemsIdForDelete,
});
export const setSelectedMenuItem = (
  section, setSectionIndex, categoryName, tableStyle, showingFirmStructSection, setSectionValues
) => (dispatch) => dispatch({
  type: SET_ITEMS_SELECTED_MENU_ITEM,
  section,
  setSectionIndex,
  setSectionValues,
  tableStyle,
  categoryName,
  showingFirmStructSection,
});
export const addDataToFirmStruct = (showingFirmStructSection) => (dispatch) => dispatch({
  type: ADD_DATA_TO_FIRM_STRUCT,
  showingFirmStructSection,
});
export const modifyBranches = (showingFirmStructSection) => (dispatch) => dispatch({
  type: MODIFY_BRANCHES,
  showingFirmStructSection,
});
export const modifySubBranches = (branchesIndex, showingFirmStructSection) => (dispatch) => dispatch({
  type: MODIFY_SUB_BRANCHES,
  branchesIndex,
  showingFirmStructSection,
});
export const modifyEmployees = (
  branchesIndex, subBranchesIndex, showingFirmStructSection
) => (dispatch) => dispatch({
  type: MODIFY_EMPLOYEES,
  branchesIndex,
  subBranchesIndex,
  showingFirmStructSection,

});
