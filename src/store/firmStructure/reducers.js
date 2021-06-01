import cloneDeep from 'lodash.clonedeep';
import { BRANCHES, BRANCHES_STYLE, EMPTY_STRING } from '../../constants/firmStructureElements';
import firmStruct from '../../data/inputFirmStructData';
import {
  SET_IS_MODAL_SHOW,
  REMOVE_DATA_FROM_FIRM_STRUCT,
  SET_ITEMS_FOR_DELETE,
  ADD_DATA_TO_FIRM_STRUCT,
  SET_SORTING,
  SET_ITEMS_SELECTED_MENU_ITEM,
  MODIFY_BRANCHES,
  MODIFY_SUB_BRANCHES,
  MODIFY_EMPLOYEES
} from './types';

const initialState = {
  isModalShow: false,
  sortDirection: EMPTY_STRING, // one of these -> EMPTY_STRING, ASCENDING, DESCENDING
  sortedColumnName: EMPTY_STRING,
  categoryName: Object.keys(firmStruct).includes(BRANCHES) ? BRANCHES : EMPTY_STRING,
  branchesIndex: -1,
  subBranchesIndex: -1,
  isEmployees: false,
  showingFirmStructSection: cloneDeep(firmStruct.branches),
  tableStyle: BRANCHES_STYLE,
  itemsIdForDelete: [],
  firmStruct: cloneDeep(firmStruct),
};
const firmStructure = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_MODAL_SHOW:
      return { ...state, isModalShow: action.isModalShow };

    case SET_SORTING:
      return {
        ...state,
        sortDirection: action.sortDirection,
        sortedColumnName: action.sortedColumnName,
      };

    case REMOVE_DATA_FROM_FIRM_STRUCT:
      return {
        ...state,
        itemsIdForDelete: [],
        showingFirmStructSection: action.showingFirmStructSection,
      };

    case SET_ITEMS_FOR_DELETE:
      return { ...state, itemsIdForDelete: [...action.itemsIdForDelete] };

    case SET_ITEMS_SELECTED_MENU_ITEM:
      return {
        ...state,
        sortDirection: EMPTY_STRING,
        sortedColumnName: EMPTY_STRING,
        [`${action.section}Index`]: action.setSectionIndex,
        itemsIdForDelete: [],
        ...action.setSectionValues,
        tableStyle: action.tableStyle,
        categoryName: action.categoryName,
        showingFirmStructSection: action.showingFirmStructSection,
      };

    case ADD_DATA_TO_FIRM_STRUCT:
      return {
        ...state,
        showingFirmStructSection: action.showingFirmStructSection,
      };

    case MODIFY_BRANCHES:
      return {
        ...state,
        firmStruct: {
          ...state.firmStruct,
          branches: action.showingFirmStructSection,
        }
      };

    case MODIFY_SUB_BRANCHES:
      return {
        ...state,
        firmStruct: {
          ...state.firmStruct,
          branches: [...state.firmStruct.branches.map((item, index) => {
            if (index === action.branchesIndex) {
              return {
                ...item,
                subBranches: action.showingFirmStructSection,
              };
            }
            return item;
          })]
        }
      };

    case MODIFY_EMPLOYEES:
      return {
        ...state,
        firmStruct: {
          ...state.firmStruct,
          branches: [...state.firmStruct.branches.map((branch, branchIndex) => {
            if (branchIndex === action.branchesIndex) {
              return {
                ...branch,
                subBranches: [...branch.subBranches.map((subBranch, subBranchIndex) => {
                  if (subBranchIndex === action.subBranchesIndex) {
                    return {
                      ...subBranch,
                      employees: action.showingFirmStructSection,
                    };
                  }
                  return subBranch;
                })]
              };
            }
            return branch;
          })]
        }
      };

    default:
      return state;
  }
};

export default firmStructure;
