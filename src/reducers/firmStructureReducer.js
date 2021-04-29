import cloneDeep from 'lodash.clonedeep';
import { BRANCHES, BRANCHES_STYLE, EMPTY_STRING } from '../constants/firmStructureElements';
import firmStruct from '../data/inputFirmStructData';

export const IS_MODAL_SHOW = 'IS_MODAL_SHOW';
export const SET_SORTING = 'SET_SORTING';
export const REMOVE_DATA_FROM_FIRM_STRUCT = 'REMOVE_DATA_FROM_FIRM_STRUCT';
export const SET_ITEMS_FOR_DELETE = 'SET_ITEMS_FOR_DELETE';
export const SET_ITEMS_SELECTED_MENU_ITEM = 'SET_ITEMS_SELECTED_MENU_ITEM';
export const ADD_DATA_TO_FIRM_STRUCT = 'ADD_DATA_TO_FIRM_STRUCT';

export const initialState = {
  isModalShow: false,
  sortDirection: EMPTY_STRING, // one of these -> EMPTY_STRING, ascending, descending
  sortedColumnName: EMPTY_STRING,
  categoryName: Object.keys(firmStruct).includes(BRANCHES) ? BRANCHES : EMPTY_STRING,
  branchesIndex: -1,
  subBranchesIndex: -1,
  isEmployees: false,
  showingFirmStructSection: cloneDeep(firmStruct.branches),
  tableStyle: BRANCHES_STYLE,
  itemsIdForDelete: [],
};
export const firmStructureReducer = (state, action) => {
  switch (action.type) {
    case IS_MODAL_SHOW:
      return { ...state, ...action.payload };

    case SET_SORTING:
      return { ...state, ...action.payload };

    case REMOVE_DATA_FROM_FIRM_STRUCT:
      return { ...state, ...action.payload };

    case SET_ITEMS_FOR_DELETE:
      return { ...state, ...action.payload };

    case SET_ITEMS_SELECTED_MENU_ITEM:
      return { ...state, ...action.payload };

    case ADD_DATA_TO_FIRM_STRUCT:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
