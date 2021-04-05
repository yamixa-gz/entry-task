import {SALARY, DESCENDING, ASCENDING} from './constants'
import cloneDeep from 'lodash.clonedeep'

const sortColumnByName = (columnName, sortDirection) => {
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
export const builtInSort = (sortingArr, sortDirection, columnName) => {
  if (!sortDirection) return cloneDeep(sortingArr)
  return cloneDeep(sortingArr).sort(sortColumnByName(columnName, sortDirection))
}
export const ownSelectionSort = (sortingArr, sortDirection, columnName) => {
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
