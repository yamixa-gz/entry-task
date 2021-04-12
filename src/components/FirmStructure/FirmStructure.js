import React, {Component} from 'react'
import classNames from 'classnames/bind'
import s from './BranchesTableHeader/scss/BranchesTableHeader.module.scss'
import {firmStruct} from './inputData'
import uuid from 'react-uuid'
import cloneDeep from 'lodash.clonedeep'
import {
  EMPLOYEES_STYLE,
  EMPTY_STRING,
  BRANCHES,
  BRANCHES_STYLE,
  DIRECTORS,
  CATEGORY_NAME,
  SUB_BRANCHES,
  SALARY
} from '../../constants/firmStructureSections'
import {ASCENDING, DESCENDING} from '../../constants/sortHeading'
import FirmStructureView from './FirmStructureView'

const cx = classNames.bind(s)

class FirmStructure extends Component {
  state = {
    isModalShow: false,
    sortDirection: EMPTY_STRING, //one of these -> EMPTY_STRING, ascending, descending
    sortedColumnName: EMPTY_STRING,
    firmStructControls: {
      categoryName: Object.keys(firmStruct).includes(BRANCHES) ? BRANCHES : EMPTY_STRING,
      branchesIndex: -1,
      subBranchesIndex: -1,
      isEmployees: false,
      showingFirmStructSection: cloneDeep(firmStruct.branches),
      tableStyle: BRANCHES_STYLE,
      itemsIdForDelete: [],
    }
  }
  sortColumnByName = (columnName, sortDirection) => {
    if (columnName === SALARY) {
      if (sortDirection === ASCENDING) {
        return (prevEl, nextEl) => prevEl.salary - nextEl.salary
      } else {
        return (prevEl, nextEl) => nextEl.salary - prevEl.salary
      }
    } else {
      if (sortDirection === ASCENDING) {
        return (prevEl, nextEl) => {
          if (prevEl[columnName].toLowerCase() > nextEl[columnName].toLowerCase()) return 1
          if (prevEl[columnName].toLowerCase() < nextEl[columnName].toLowerCase()) return -1
          return 0
        }
      } else {
        return (prevEl, nextEl) => {
          if (prevEl[columnName].toLowerCase() < nextEl[columnName].toLowerCase()) return 1
          if (prevEl[columnName].toLowerCase() > nextEl[columnName].toLowerCase()) return -1
          return 0
        }
      }
    }
  }
  builtInSort = (sortingArr, sortDirection, columnName) => {
    if (!sortDirection) return cloneDeep(sortingArr)
    return cloneDeep(sortingArr).sort(this.sortColumnByName(columnName, sortDirection))
  }
  ownSelectionSort = (sortingArr, sortDirection, columnName) => {
    if (!sortDirection) return cloneDeep(sortingArr)
    const isNumberTypeValue = columnName === SALARY
    let newSortingArr = cloneDeep(sortingArr)
    for (let i = 0; i < newSortingArr.length - 1; i++) {
      for (let j = i + 1; j < newSortingArr.length; j++) {
        if (sortDirection === ASCENDING) {
          if (isNumberTypeValue) {
            newSortingArr[j][columnName] < newSortingArr[i][columnName]
            && ([newSortingArr[i], newSortingArr[j]] = [newSortingArr[j], newSortingArr[i]])
          } else {
            newSortingArr[j][columnName].toLowerCase() < newSortingArr[i][columnName].toLowerCase()
            && ([newSortingArr[i], newSortingArr[j]] = [newSortingArr[j], newSortingArr[i]])
          }
        }
        if (sortDirection === DESCENDING) {
          if (isNumberTypeValue) {
            newSortingArr[j][columnName] > newSortingArr[i][columnName]
            && ([newSortingArr[i], newSortingArr[j]] = [newSortingArr[j], newSortingArr[i]])
          } else {
            newSortingArr[j][columnName].toLowerCase() > newSortingArr[i][columnName].toLowerCase()
            && ([newSortingArr[i], newSortingArr[j]] = [newSortingArr[j], newSortingArr[i]])
          }
        }
      }
    }
    return newSortingArr
  }
  setModalShow = value => this.setState({
    ...this.state, isModalShow: value
  })
  sortClickHandler = (columnName) => {
    let setSortDirection
    const {sortDirection, sortedColumnName} = this.state
    switch (sortDirection) {
      case ASCENDING:
        setSortDirection = DESCENDING
        break
      case DESCENDING:
        setSortDirection = EMPTY_STRING
        break
      case EMPTY_STRING:
        setSortDirection = ASCENDING
        break
      default:
        setSortDirection = EMPTY_STRING
    }
    if (sortedColumnName !== columnName) {
      setSortDirection = ASCENDING
    }
    this.setState({
      ...this.state,
      sortDirection: setSortDirection,
      sortedColumnName: columnName,
    })
  }
  removeDataFromFirmStructHandler = () => {
    const {
      itemsIdForDelete, categoryName, subBranchesIndex, branchesIndex,
      showingFirmStructSection: stateShowingFirmStructSection
    } = this.state.firmStructControls
    let newShowingFirmStructSection = []
    if (!itemsIdForDelete.length) return

    if (categoryName === DIRECTORS) {
      const newModifiedDirectors = this.removeItemsFromFirmStructSection(firmStruct.directors, itemsIdForDelete)
      // eslint-disable-next-line
      console.log('Source section \"directors\":', Object.values(firmStruct.directors))
      // eslint-disable-next-line
      console.log('New modified section \"directors\":', Object.values(newModifiedDirectors))
      newShowingFirmStructSection = Object.values(newModifiedDirectors)
      firmStruct.directors = newModifiedDirectors
    } else if (categoryName === BRANCHES) {

      newShowingFirmStructSection = this.removeItemsFromFirmStructSection(stateShowingFirmStructSection, itemsIdForDelete)
      switch (stateShowingFirmStructSection[0].id) {
        case firmStruct.branches[0].id:
          // eslint-disable-next-line
          console.log('Source section \"branches\":', firmStruct.branches)
          // eslint-disable-next-line
          console.log('New modified section \"branches\":', newShowingFirmStructSection)
          firmStruct.branches = newShowingFirmStructSection
          break
        case firmStruct.branches[branchesIndex].subBranches[0].id:
          // eslint-disable-next-line
          console.log('Source section \"subBranches\":',
              firmStruct.branches[branchesIndex].subBranches)
          // eslint-disable-next-line
          console.log('New modified section \"subBranches\":', newShowingFirmStructSection)
          firmStruct.branches[branchesIndex].subBranches = newShowingFirmStructSection
          break
        case firmStruct.branches[branchesIndex].subBranches[subBranchesIndex].employees[0].id:
          // eslint-disable-next-line
          console.log('Source section \"employees\":', firmStruct.branches[branchesIndex]
              .subBranches[subBranchesIndex].employees)
          // eslint-disable-next-line
          console.log('New modified section \"employees\":', newShowingFirmStructSection)
          firmStruct.branches[branchesIndex].subBranches[subBranchesIndex].employees = newShowingFirmStructSection
          break
        default:
      }
    }
    this.setState({
      ...this.state, firmStructControls: {
        ...this.state.firmStructControls,
        itemsIdForDelete: [],
        showingFirmStructSection: newShowingFirmStructSection,
      }
    })
  }
  onClickTableRowHandler = id => {
    const {itemsIdForDelete} = this.state.firmStructControls
    let oldArr = itemsIdForDelete
    let newArr = [...itemsIdForDelete]
    oldArr.includes(id) ? newArr = oldArr.filter(el => el !== id) : newArr.push(id)
    this.setState({
      ...this.state, firmStructControls: {
        ...this.state.firmStructControls,
        itemsIdForDelete: newArr,
      }
    })
  }
  onMenuItemSelectHandler = (selectedMenuItem) => {
    const section = selectedMenuItem.split('-*-')[0]
    const selectedIndex = +selectedMenuItem.split('-*-')[1]
    const {branchesIndex, categoryName: stateCategoryName} = this.state.firmStructControls
    let categoryName = EMPTY_STRING
    let setSectionIndex
    let tableStyle
    let showingFirmStructSection = []
    let setSectionValues = {}

    if (section === CATEGORY_NAME) {
      categoryName = selectedMenuItem.split('-*-')[2]
      if (categoryName === BRANCHES) {
        showingFirmStructSection = cloneDeep(firmStruct[categoryName])
      } else if (categoryName === DIRECTORS) {
        Object.keys(firmStruct.directors).forEach((key) => {
          showingFirmStructSection.push({...firmStruct.directors[key]})
        })
      }
      tableStyle = categoryName === DIRECTORS ? EMPLOYEES_STYLE : BRANCHES_STYLE
      if (categoryName === DIRECTORS) {
        setSectionValues = {
          branchesIndex: -1,
          subBranchesIndex: -1,
          isEmployees: false,
        }
      } else if (categoryName === BRANCHES) {
        setSectionValues = {
          branchesIndex: -1,
          subBranchesIndex: -1,
          isEmployees: false,
        }
      }
    }
    if (section === BRANCHES) {
      setSectionIndex = selectedIndex
      showingFirmStructSection = cloneDeep(firmStruct.branches[selectedIndex].subBranches)
      tableStyle = BRANCHES_STYLE
      setSectionValues = {
        subBranchesIndex: -1,
        isEmployees: false,
      }
    }
    if (section === SUB_BRANCHES) {
      setSectionIndex = selectedIndex
      showingFirmStructSection = cloneDeep(firmStruct.branches[branchesIndex].subBranches[selectedIndex].employees)
      tableStyle = EMPLOYEES_STYLE
      setSectionValues = {
        isEmployees: true,
      }
    }
    this.setState({
      ...this.state,
      sortDirection: EMPTY_STRING,
      sortedColumnName: EMPTY_STRING,
      firmStructControls: {
        ...this.state.firmStructControls,
        [section + 'Index']: setSectionIndex,
        categoryName: categoryName ? categoryName : stateCategoryName,
        ...setSectionValues,
        itemsIdForDelete: [],
        tableStyle,
        showingFirmStructSection,
      }
    })
  }
  addItemToFirmStructSection = (section, data) => {
    let modifiedSection
    if (Array.isArray(section)) {
      modifiedSection = cloneDeep(section)
      modifiedSection.push({...data})
    } else {
      modifiedSection = Object.fromEntries(Object.entries(section))
      modifiedSection[uuid()] = {...data}
    }
    return modifiedSection
  }
  addDataFromFormToFirmStruct = (data) => {
    const {categoryName, branchesIndex, subBranchesIndex, isEmployees} = this.state.firmStructControls
    let showingFirmStructSection
    if (categoryName === DIRECTORS) {
      const {job, name, surname, salary} = data
      const newModifiedDirectors = this.addItemToFirmStructSection(firmStruct.directors,
          {
            id: uuid(),
            job,
            name,
            surname,
            salary,
          })
      // eslint-disable-next-line
      console.log('Source section \"directors\":', Object.values(firmStruct.directors))
      // eslint-disable-next-line
      console.log('New modified section \"directors\":', Object.values(newModifiedDirectors))
      firmStruct.directors = newModifiedDirectors
      showingFirmStructSection = Object.values(firmStruct.directors)
    }
    if (categoryName === BRANCHES && branchesIndex === -1) {
      const {branchName} = data
      const newModifiedBranches = this.addItemToFirmStructSection(firmStruct.branches,
          {
            id: uuid(),
            title: branchName,
            subBranches: []
          })
      // eslint-disable-next-line
      console.log('Source section \"branches\":', firmStruct.branches)
      // eslint-disable-next-line
      console.log('New modified section \"branches\":', newModifiedBranches)
      firmStruct.branches = newModifiedBranches
      showingFirmStructSection = cloneDeep(newModifiedBranches)
    }
    if (categoryName === BRANCHES && branchesIndex >= 0 && !isEmployees) {
      const {branchName} = data
      const newModifiedSubBranches = this.addItemToFirmStructSection(
          firmStruct.branches[branchesIndex].subBranches,
          {
            id: uuid(),
            title: branchName,
            employees: []
          })
      // eslint-disable-next-line
      console.log('Source section \"subBranches\":', firmStruct.branches[branchesIndex].subBranches)
      // eslint-disable-next-line
      console.log('New modified section \"subBranches\":', newModifiedSubBranches)
      firmStruct.branches[branchesIndex].subBranches = newModifiedSubBranches
      showingFirmStructSection = cloneDeep(newModifiedSubBranches)
    }
    if (categoryName === BRANCHES && branchesIndex >= 0 && subBranchesIndex >= 0) {
      const {job, name, surname, salary} = data
      const newModifiedEmployees = this.addItemToFirmStructSection(
          firmStruct.branches[branchesIndex].subBranches[subBranchesIndex].employees,
          {
            id: uuid(),
            job,
            name,
            surname,
            salary,
          })
      // eslint-disable-next-line
      console.log('Source section \"employees\":',
          firmStruct.branches[branchesIndex].subBranches[subBranchesIndex].employees)
      // eslint-disable-next-line
      console.log('New modified section \"employees\":', newModifiedEmployees)
      firmStruct.branches[branchesIndex].subBranches[subBranchesIndex].employees = newModifiedEmployees
      showingFirmStructSection = cloneDeep(newModifiedEmployees)
    }

    this.setState({
      ...this.state, firmStructControls: {
        ...this.state.firmStructControls,
        showingFirmStructSection,
      }
    })
  }
  removeItemsFromFirmStructSection = (currentSection, itemsIdForDelete) => {
    let newModifiedSection
    if (Array.isArray(currentSection)) {
      newModifiedSection = cloneDeep(currentSection.filter(el => {
        for (let i = 0; i < itemsIdForDelete.length; i++) {
          if (itemsIdForDelete[i] === el.id) return false
        }
        return true
      }))
    } else {
      newModifiedSection = Object.fromEntries(Object.entries(firmStruct.directors)
          .filter(entry => !itemsIdForDelete.includes(entry[1].id)))
    }
    return newModifiedSection
  }
  setColumnStyle = columnName =>
      cx({
        arrowDirection: this.state.sortedColumnName === columnName,
        arrowDirectionDown: this.state.sortDirection === ASCENDING,
        arrowDirectionUp: this.state.sortDirection === DESCENDING
      })

  render() {
    const {isModalShow, sortDirection, sortedColumnName: columnName} = this.state
    const {
      showingFirmStructSection: oldShowingFirmStructSection,
      branchesIndex,
      subBranchesIndex,
      categoryName,
      tableStyle,
      itemsIdForDelete
    } = this.state.firmStructControls

// sort functions
    const showingFirmStructSection = this.builtInSort(oldShowingFirmStructSection, sortDirection, columnName)
//     const showingFirmStructSection = this.ownSelectionSort(oldShowingFirmStructSection, sortDirection, columnName)

    if (sortDirection) {
      console.log('Source object array to show: ', oldShowingFirmStructSection)
      console.log('New sorted object array to show: ', showingFirmStructSection)
    }
    const isCategoryDisabled = !categoryName
    const isBranchesDisabled = !(firmStruct.branches.length > 0
        && (categoryName === BRANCHES))
    const isSubBranchesDisabled = !(firmStruct.branches[branchesIndex]?.subBranches?.length > 0
        && categoryName === BRANCHES)

    return <FirmStructureView isCategoryDisabled={isCategoryDisabled}
                              isBranchesDisabled={isBranchesDisabled}
                              isSubBranchesDisabled={isSubBranchesDisabled}
                              isModalShow={isModalShow}
                              setModalShow={this.setModalShow}
                              setColumnStyle={this.setColumnStyle}
                              sortClickHandler={this.sortClickHandler}
                              onMenuItemSelectHandler={this.onMenuItemSelectHandler}
                              removeDataFromFirmStructHandler={this.removeDataFromFirmStructHandler}
                              onClickTableRowHandler={this.onClickTableRowHandler}
                              addDataFromFormToFirmStruct={this.addDataFromFormToFirmStruct}
                              itemsIdForDelete={itemsIdForDelete}
                              categoryName={categoryName}
                              tableStyle={tableStyle}
                              branchesIndex={branchesIndex}
                              subBranchesIndex={subBranchesIndex}
                              showingFirmStructSection={showingFirmStructSection}
                              firmStruct={firmStruct}
    />
  }
}

export default FirmStructure
