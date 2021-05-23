import React from 'react';
import classNames from 'classnames/bind';
import uuid from 'react-uuid';
import cloneDeep from 'lodash.clonedeep';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import s from './scss/TableHeader.module.scss';
import {
  EMPLOYEES_STYLE,
  EMPTY_STRING,
  BRANCHES,
  BRANCHES_STYLE,
  DIRECTORS,
  CATEGORY_NAME,
  SUB_BRANCHES,
  SALARY
} from '../../constants/firmStructureElements';
import { ASCENDING, DESCENDING } from '../../constants/sortHeading';
import FirmStructureView from './FirmStructureView';
import {
  addDataToFirmStruct,
  modifyBranches,
  modifyEmployees,
  modifySubBranches,
  removeDataFromFirmStruct,
  setItemsForDelete,
  setSelectedMenuItem,
  setSortDirectionByColumn,
} from '../../store/firmStructure/actions';

const cx = classNames.bind(s);
const FirmStructure = ({
  setSortDirectionByColumnAction,
  removeDataFromFirmStructAction,
  setItemsForDeleteAction,
  setSelectedMenuItemAction,
  addDataToFirmStructAction,
  modifyBranchesAction,
  modifySubBranchesAction,
  modifyEmployeesAction,
  state,
}) => {
  const { firmStruct } = state;
  const sortColumnByName = (columnName, sortDirection) => {
    if (columnName === SALARY) {
      if (sortDirection === ASCENDING) {
        return (prevEl, nextEl) => prevEl.salary - nextEl.salary;
      }
      return (prevEl, nextEl) => nextEl.salary - prevEl.salary;
    }
    if (sortDirection === ASCENDING) {
      return (prevEl, nextEl) => {
        if (prevEl[columnName].toLowerCase() > nextEl[columnName].toLowerCase()) return 1;
        if (prevEl[columnName].toLowerCase() < nextEl[columnName].toLowerCase()) return -1;
        return 0;
      };
    }
    return (prevEl, nextEl) => {
      if (prevEl[columnName].toLowerCase() < nextEl[columnName].toLowerCase()) return 1;
      if (prevEl[columnName].toLowerCase() > nextEl[columnName].toLowerCase()) return -1;
      return 0;
    };
  };

  // eslint-disable-next-line no-unused-vars
  const builtInSort = (sortingArr, sortDirection, columnName) => {
    if (!sortDirection) return cloneDeep(sortingArr);
    return cloneDeep(sortingArr)
      .sort(sortColumnByName(columnName, sortDirection));
  };

  // eslint-disable-next-line no-unused-vars
  const ownSelectionSort = (sortingArr, sortDirection, columnName) => {
    if (!sortDirection) return cloneDeep(sortingArr);
    const isNumberTypeValue = columnName === SALARY;
    const newSortingArr = cloneDeep(sortingArr);
    for (let i = 0; i < newSortingArr.length - 1; i += 1) {
      for (let j = i + 1; j < newSortingArr.length; j += 1) {
        switch (sortDirection) {
          case ASCENDING:
            if (isNumberTypeValue) {
              if (newSortingArr[j][columnName] < newSortingArr[i][columnName]) {
                ([newSortingArr[i], newSortingArr[j]] = [newSortingArr[j], newSortingArr[i]]);
              }
            } else if (!isNumberTypeValue) {
              if (newSortingArr[j][columnName].toLowerCase() < newSortingArr[i][columnName].toLowerCase()) {
                ([newSortingArr[i], newSortingArr[j]] = [newSortingArr[j], newSortingArr[i]]);
              }
            }
            break;
          case DESCENDING:
            if (isNumberTypeValue) {
              if (newSortingArr[j][columnName] > newSortingArr[i][columnName]) {
                ([newSortingArr[i], newSortingArr[j]] = [newSortingArr[j], newSortingArr[i]]);
              }
            } else if (!isNumberTypeValue) {
              if (newSortingArr[j][columnName].toLowerCase() > newSortingArr[i][columnName].toLowerCase()) {
                ([newSortingArr[i], newSortingArr[j]] = [newSortingArr[j], newSortingArr[i]]);
              }
            }
            break;
          default:
        }
      }
    }
    return newSortingArr;
  };
  const removeItemsFromFirmStructSection = (currentSection, itemsIdForDelete) => {
    let newModifiedSection;
    if (Array.isArray(currentSection)) {
      newModifiedSection = cloneDeep(currentSection.filter((el) => {
        for (let i = 0; i < itemsIdForDelete.length; i += 1) {
          if (itemsIdForDelete[i] === el.id) return false;
        }
        return true;
      }));
    } else {
      newModifiedSection = Object.fromEntries(Object.entries(firmStruct.directors)
        .filter((entry) => !itemsIdForDelete.includes(entry[1].id)));
    }
    return newModifiedSection;
  };
  const sortClickHandler = (columnName) => {
    const {
      sortDirection,
      sortedColumnName
    } = state;
    let newSortDirection;
    switch (sortDirection) {
      case ASCENDING:
        newSortDirection = DESCENDING;
        break;
      case DESCENDING:
        newSortDirection = EMPTY_STRING;
        break;
      case EMPTY_STRING:
        newSortDirection = ASCENDING;
        break;
      default:
        newSortDirection = EMPTY_STRING;
    }
    if (sortedColumnName !== columnName) {
      newSortDirection = ASCENDING;
    }
    setSortDirectionByColumnAction(newSortDirection, columnName);
  };

  const removeDataFromFirmStructHandler = () => {
    const {
      itemsIdForDelete,
      categoryName,
      subBranchesIndex,
      branchesIndex,
      showingFirmStructSection: stateShowingFirmStructSection
    } = state;
    let newShowingFirmStructSection = [];
    if (!itemsIdForDelete.length) return;

    if (categoryName === DIRECTORS) {
      const newModifiedDirectors = removeItemsFromFirmStructSection(firmStruct.directors, itemsIdForDelete);
      // eslint-disable-next-line
      console.log('Source section \"directors\":', Object.values(firmStruct.directors));
      // eslint-disable-next-line
      console.log('New modified section \"directors\":', Object.values(newModifiedDirectors));
      newShowingFirmStructSection = Object.values(newModifiedDirectors);
      firmStruct.directors = newModifiedDirectors;
    } else if (categoryName === BRANCHES) {
      newShowingFirmStructSection = removeItemsFromFirmStructSection(
        stateShowingFirmStructSection, itemsIdForDelete
      );
      switch (stateShowingFirmStructSection[0].id) {
        case firmStruct.branches[0].id:
          // eslint-disable-next-line
          console.log('Source section \"branches\":', firmStruct.branches);
          // eslint-disable-next-line
          console.log('New modified section \"branches\":', newShowingFirmStructSection);
          modifyBranchesAction(newShowingFirmStructSection);
          break;
        case firmStruct.branches[branchesIndex].subBranches[0].id:
          // eslint-disable-next-line
          console.log('Source section \"subBranches\":',
            firmStruct.branches[branchesIndex].subBranches);
          // eslint-disable-next-line
          console.log('New modified section \"subBranches\":', newShowingFirmStructSection);
          modifySubBranchesAction(branchesIndex, newShowingFirmStructSection);
          break;
        case firmStruct.branches[branchesIndex].subBranches[subBranchesIndex].employees[0].id:
          // eslint-disable-next-line
          console.log('Source section \"employees\":', firmStruct.branches[branchesIndex]
            .subBranches[subBranchesIndex].employees);
          // eslint-disable-next-line
          console.log('New modified section \"employees\":', newShowingFirmStructSection);
          modifyEmployeesAction(branchesIndex, subBranchesIndex, newShowingFirmStructSection);
          break;
        default:
      }
    }
    removeDataFromFirmStructAction(newShowingFirmStructSection);
  };

  const onClickTableRowHandler = (id) => {
    const { itemsIdForDelete } = state;
    let newArr = [...itemsIdForDelete];

    if (itemsIdForDelete.includes(id)) {
      newArr = itemsIdForDelete.filter((el) => el !== id);
    } else {
      newArr.push(id);
    }
    setItemsForDeleteAction(newArr);
  };

  const onMenuItemSelectHandler = (selectedMenuItem) => {
    const section = selectedMenuItem.split('-*-')[0];
    const selectedIndex = +selectedMenuItem.split('-*-')[1];
    const {
      branchesIndex,
      categoryName: stateCategoryName
    } = state;
    let categoryName = EMPTY_STRING;
    let setSectionIndex;
    let tableStyle;
    let showingFirmStructSection = [];
    let setSectionValues = {};

    if (section === CATEGORY_NAME) {
      [categoryName] = [selectedMenuItem.split('-*-')[2]];
      if (categoryName === BRANCHES) {
        showingFirmStructSection = cloneDeep(firmStruct[categoryName]);
      } else if (categoryName === DIRECTORS) {
        Object.keys(firmStruct.directors)
          .forEach((key) => {
            showingFirmStructSection.push({ ...firmStruct.directors[key] });
          });
      }
      tableStyle = categoryName === DIRECTORS ? EMPLOYEES_STYLE : BRANCHES_STYLE;
      if (categoryName === DIRECTORS) {
        setSectionValues = {
          branchesIndex: -1,
          subBranchesIndex: -1,
          isEmployees: false,
        };
      } else if (categoryName === BRANCHES) {
        setSectionValues = {
          branchesIndex: -1,
          subBranchesIndex: -1,
          isEmployees: false,
        };
      }
    }
    if (section === BRANCHES) {
      setSectionIndex = selectedIndex;
      showingFirmStructSection = cloneDeep(firmStruct.branches[selectedIndex].subBranches);
      tableStyle = BRANCHES_STYLE;
      setSectionValues = {
        subBranchesIndex: -1,
        isEmployees: false,
      };
    }
    if (section === SUB_BRANCHES) {
      setSectionIndex = selectedIndex;
      showingFirmStructSection = cloneDeep(firmStruct.branches[branchesIndex].subBranches[selectedIndex].employees);
      tableStyle = EMPLOYEES_STYLE;
      setSectionValues = {
        isEmployees: true,
      };
    }
    setSelectedMenuItemAction(
      section, setSectionIndex, categoryName || stateCategoryName,
      tableStyle, showingFirmStructSection, setSectionValues
    );
  };

  const addItemToFirmStructSection = (section, data) => {
    let modifiedSection;
    if (Array.isArray(section)) {
      modifiedSection = cloneDeep(section);
      modifiedSection.push({ ...data });
    } else {
      modifiedSection = Object.fromEntries(Object.entries(section));
      modifiedSection[uuid()] = { ...data };
    }
    return modifiedSection;
  };

  const addDataFromFormToFirmStruct = (data) => {
    const {
      categoryName,
      branchesIndex,
      subBranchesIndex,
      isEmployees
    } = state;
    let showingFirmStructSection;
    if (categoryName === DIRECTORS) {
      const {
        job,
        name,
        surname,
        salary
      } = data;
      const newModifiedDirectors = addItemToFirmStructSection(firmStruct.directors,
        {
          id: uuid(),
          job,
          name,
          surname,
          salary,
        });
      // eslint-disable-next-line
      console.log('Source section \"directors\":', Object.values(firmStruct.directors));
      // eslint-disable-next-line
      console.log('New modified section \"directors\":', Object.values(newModifiedDirectors));
      firmStruct.directors = newModifiedDirectors;
      showingFirmStructSection = Object.values(firmStruct.directors);
    }
    if (categoryName === BRANCHES && branchesIndex === -1) {
      const { branchName } = data;
      const newModifiedBranches = addItemToFirmStructSection(firmStruct.branches,
        {
          id: uuid(),
          title: branchName,
          subBranches: []
        });
      // eslint-disable-next-line
      console.log('Source section \"branches\":', firmStruct.branches);
      // eslint-disable-next-line
      console.log('New modified section \"branches\":', newModifiedBranches);
      firmStruct.branches = newModifiedBranches;
      showingFirmStructSection = cloneDeep(newModifiedBranches);
    }
    if (categoryName === BRANCHES && branchesIndex >= 0 && !isEmployees) {
      const { branchName } = data;
      const newModifiedSubBranches = addItemToFirmStructSection(
        firmStruct.branches[branchesIndex].subBranches,
        {
          id: uuid(),
          title: branchName,
          employees: []
        }
      );
      // eslint-disable-next-line
      console.log('Source section \"subBranches\":', firmStruct.branches[branchesIndex].subBranches);
      // eslint-disable-next-line
      console.log('New modified section \"subBranches\":', newModifiedSubBranches);
      firmStruct.branches[branchesIndex].subBranches = newModifiedSubBranches;
      showingFirmStructSection = cloneDeep(newModifiedSubBranches);
    }
    if (categoryName === BRANCHES && branchesIndex >= 0 && subBranchesIndex >= 0) {
      const {
        job,
        name,
        surname,
        salary
      } = data;
      const newModifiedEmployees = addItemToFirmStructSection(
        firmStruct.branches[branchesIndex].subBranches[subBranchesIndex].employees,
        {
          id: uuid(),
          job,
          name,
          surname,
          salary,
        }
      );
      // eslint-disable-next-line
      console.log('Source section \"employees\":',
        firmStruct.branches[branchesIndex].subBranches[subBranchesIndex].employees);
      // eslint-disable-next-line
      console.log('New modified section \"employees\":', newModifiedEmployees);
      firmStruct.branches[branchesIndex].subBranches[subBranchesIndex].employees = newModifiedEmployees;
      showingFirmStructSection = cloneDeep(newModifiedEmployees);
    }

    addDataToFirmStructAction(showingFirmStructSection);
  };

  const setColumnStyle = (columnName) => {
    const {
      sortedColumnName,
      sortDirection
    } = state;
    return cx({
      arrowDirection: sortedColumnName === columnName,
      arrowDirectionDown: sortDirection === ASCENDING,
      arrowDirectionUp: sortDirection === DESCENDING
    });
  };

  const {
    sortDirection,
    sortedColumnName: columnName,
    showingFirmStructSection: oldShowingFirmStructSection,
  } = state;

  let showingFirmStructSection = oldShowingFirmStructSection;
  if (sortDirection) {
    // sort functions
    showingFirmStructSection = builtInSort(oldShowingFirmStructSection, sortDirection, columnName);
    // showingFirmStructSection = ownSelectionSort(oldShowingFirmStructSection, sortDirection, columnName)
  }
  // eslint-disable-next-line no-console
  console.log('Source object array to show: ', oldShowingFirmStructSection);
  // eslint-disable-next-line no-console
  console.log('New sorted object array to show: ', showingFirmStructSection);

  const handlers = {
    sortClickHandler,
    onMenuItemSelectHandler,
    removeDataFromFirmStructHandler,
    onClickTableRowHandler,
  };
  const callbacks = {
    setColumnStyle,
    addDataFromFormToFirmStruct,
  };
  return (
    <FirmStructureView
      handlers={handlers}
      callbacks={callbacks}
      showingFirmStructSection={showingFirmStructSection}
    />
  );
};

FirmStructure.propTypes = {
  state: PropTypes.shape({
    sortDirection: PropTypes.string.isRequired,
    sortedColumnName: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    branchesIndex: PropTypes.number.isRequired,
    subBranchesIndex: PropTypes.number.isRequired,
    isEmployees: PropTypes.bool.isRequired,
    showingFirmStructSection: PropTypes.arrayOf(PropTypes.object),
    tableStyle: PropTypes.string.isRequired,
    itemsIdForDelete: PropTypes.arrayOf(PropTypes.string),
    firmStruct: PropTypes.shape({
      branches: PropTypes.arrayOf(PropTypes.object).isRequired,
      directors: PropTypes.objectOf(PropTypes.object).isRequired,
    }),
  }).isRequired,
  setSortDirectionByColumnAction: PropTypes.func.isRequired,
  removeDataFromFirmStructAction: PropTypes.func.isRequired,
  setItemsForDeleteAction: PropTypes.func.isRequired,
  setSelectedMenuItemAction: PropTypes.func.isRequired,
  addDataToFirmStructAction: PropTypes.func.isRequired,
  modifyBranchesAction: PropTypes.func.isRequired,
  modifySubBranchesAction: PropTypes.func.isRequired,
  modifyEmployeesAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  state: {
    sortDirection: state.firmStructure.sortDirection,
    sortedColumnName: state.firmStructure.sortedColumnName,
    categoryName: state.firmStructure.categoryName,
    branchesIndex: state.firmStructure.branchesIndex,
    subBranchesIndex: state.firmStructure.subBranchesIndex,
    isEmployees: state.firmStructure.isEmployees,
    showingFirmStructSection: state.firmStructure.showingFirmStructSection,
    tableStyle: state.firmStructure.tableStyle,
    itemsIdForDelete: state.firmStructure.itemsIdForDelete,
    firmStruct: state.firmStructure.firmStruct,
  },
});
export default connect(mapStateToProps, {
  setSortDirectionByColumnAction: setSortDirectionByColumn,
  removeDataFromFirmStructAction: removeDataFromFirmStruct,
  setItemsForDeleteAction: setItemsForDelete,
  setSelectedMenuItemAction: setSelectedMenuItem,
  addDataToFirmStructAction: addDataToFirmStruct,
  modifyBranchesAction: modifyBranches,
  modifySubBranchesAction: modifySubBranches,
  modifyEmployeesAction: modifyEmployees,
})(FirmStructure);
