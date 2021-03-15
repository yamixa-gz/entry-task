import React, {Component, createRef} from 'react'
import {
  Table,
  Container,
  Button,
  FormControl,
  Dropdown,
  DropdownButton,
  ButtonGroup
} from 'react-bootstrap'
import classNames from 'classnames/bind'
import s from './common/scss/arrowDirection.module.scss'
import BranchesTableRow from './BranchesTableRow'
import {firmStruct} from './common/data'
import EmployeesTableRow from './EmployeesTableRow'
import useTableComponents from './common/useTableComponents'
import uuid from 'react-uuid'
import cloneDeep from 'lodash.clonedeep'

const cx = classNames.bind(s)

class FirmStructure extends Component {
  jobInput = createRef()
  nameInput = createRef()
  surnameInput = createRef()
  salaryInput = createRef()
  branchNameInput = createRef()

  state = {
    sortDirection: '', //one of these -> '', ascending, descending
    sortedColumnName: '',
    firmStructControls: {
      categoryName: Object.keys(firmStruct).includes('branches') ? 'branches' : '',
      branchesIndex: -1,
      subBranchesIndex: -1,
      isEmployees: false,
      showingFirmStructSection: cloneDeep(firmStruct.branches),
      tableStyle: 'branchesStyle',
      itemsIdForDelete: [],
    }
  }
  sortColumnByName = (columnName, sortDirection) => {
    if (columnName === 'salary') {
      if (sortDirection === 'ascending') {
        return (prevEl, nextEl) => prevEl.salary - nextEl.salary
      } else {
        return (prevEl, nextEl) => nextEl.salary - prevEl.salary
      }
    } else {
      if (sortDirection === 'ascending') {
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
  selectionSort = (sortingArr, sortDirection, columnName) => {
    if (!sortDirection) return sortingArr
    const isNumberTypeValue = columnName === 'salary'
    let arr = [...sortingArr]
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (sortDirection === 'ascending') {
          if (isNumberTypeValue) {
            arr[j][columnName] < arr[i][columnName] && ([arr[i], arr[j]] = [arr[j], arr[i]])
          } else {
            arr[j][columnName].toLowerCase() < arr[i][columnName].toLowerCase() && ([arr[i], arr[j]] = [arr[j], arr[i]])
          }
        }
        if (sortDirection === 'descending') {
          if (isNumberTypeValue) {
            arr[j][columnName] > arr[i][columnName] && ([arr[i], arr[j]] = [arr[j], arr[i]])
          } else {
            arr[j][columnName].toLowerCase() > arr[i][columnName].toLowerCase() && ([arr[i], arr[j]] = [arr[j], arr[i]])
          }
        }
      }
    }
    return arr
  }
  sortClickHandler = (sortedColumnName) => {
    let setSortDirection
    switch (this.state.sortDirection) {
      case 'ascending':
        setSortDirection = 'descending'
        break
      case 'descending':
        setSortDirection = ''
        break
      case '':
        setSortDirection = 'ascending'
        break
      default:
        setSortDirection = ''
    }
    if (this.state.sortedColumnName !== sortedColumnName) {
      setSortDirection = 'ascending'
    }
    this.setState({
      ...this.state,
      sortDirection: setSortDirection,
      sortedColumnName,
    })
  }
  getValidatedDataFromInputs = (...arr) => {
    if (arr.length === 1) {
      const branchName = arr[0]
      if (branchName.length > 30 || branchName.length < 5) {
        console.error('Please input valid data!')
        return ''
      }
      return branchName
    }
    if (arr.length === 4) {
      const job = arr[0]
      const name = arr[1]
      const surname = arr[2]
      const salary = arr[3]
      if (isNaN(parseInt(salary))
          || salary.length > 5
          || name.length < 3
          || name.length > 15
          || surname.length < 3
          || surname.length > 15
          || job.length < 3
          || job.length > 15
      ) {
        console.error('Please input valid data!')
        return ['', '', '', '']
      }
      return [job, name, surname, +salary]
    }
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
  addDataToFirmStructHandler = () => {
    let showingFirmStructSection
    let branchName
    let job
    let name
    let surname
    let salary
    if (this.state.firmStructControls.tableStyle === 'branchesStyle') {
      branchName = this.getValidatedDataFromInputs(this.branchNameInput.current.value)
      if (!branchName) return
      this.branchNameInput.current.value = ''
    }
    if (this.state.firmStructControls.tableStyle === 'employeesStyle') {
      [job, name, surname, salary] = this.getValidatedDataFromInputs(
          this.jobInput.current.value,
          this.nameInput.current.value,
          this.surnameInput.current.value,
          this.salaryInput.current.value)
      if (!job
          || !name
          || !surname
          || !salary) return
      this.jobInput.current.value = ''
      this.nameInput.current.value = ''
      this.surnameInput.current.value = ''
      this.salaryInput.current.value = ''
    }
    if (this.state.firmStructControls.categoryName === 'directors') {
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
    if (this.state.firmStructControls.categoryName === 'branches'
        && this.state.firmStructControls.branchesIndex === -1) {

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
    if (this.state.firmStructControls.categoryName === 'branches'
        && this.state.firmStructControls.branchesIndex >= 0
        && !this.state.firmStructControls.isEmployees) {

      const newModifiedSubBranches = this.addItemToFirmStructSection(firmStruct
              .branches[this.state.firmStructControls.branchesIndex]
              .subBranches,
          {
            id: uuid(),
            title: branchName,
            employees: []
          })
      // eslint-disable-next-line
      console.log('Source section \"subBranches\":', firmStruct
          .branches[this.state.firmStructControls.branchesIndex]
          .subBranches)
      // eslint-disable-next-line
      console.log('New modified section \"subBranches\":', newModifiedSubBranches)
      firmStruct
          .branches[this.state.firmStructControls.branchesIndex]
          .subBranches = newModifiedSubBranches
      showingFirmStructSection = cloneDeep(newModifiedSubBranches)
    }
    if (this.state.firmStructControls.categoryName === 'branches'
        && this.state.firmStructControls.branchesIndex >= 0
        && this.state.firmStructControls.subBranchesIndex >= 0) {

      const newModifiedEmployees = this.addItemToFirmStructSection(firmStruct
              .branches[this.state.firmStructControls.branchesIndex]
              .subBranches[this.state.firmStructControls.subBranchesIndex]
              .employees,
          {
            id: uuid(),
            job,
            name,
            surname,
            salary,
          })
      // eslint-disable-next-line
      console.log('Source section \"employees\":', firmStruct
          .branches[this.state.firmStructControls.branchesIndex]
          .subBranches[this.state.firmStructControls.subBranchesIndex]
          .employees)
      // eslint-disable-next-line
      console.log('New modified section \"employees\":', newModifiedEmployees)
      firmStruct
          .branches[this.state.firmStructControls.branchesIndex]
          .subBranches[this.state.firmStructControls.subBranchesIndex]
          .employees = newModifiedEmployees
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
    let modifiedSection
    if (Array.isArray(currentSection)) {
      modifiedSection = cloneDeep(currentSection.filter(el => {
        for (let i = 0; i < itemsIdForDelete.length; i++) {
          if (itemsIdForDelete[i] === el.id) return false
        }
        return true
      }))
    } else {
      modifiedSection = Object.fromEntries(Object.entries(firmStruct.directors)
          .filter(entry => !itemsIdForDelete.includes(entry[1].id)))
    }
    return modifiedSection
  }
  removeDataFromFirmStructHandler = () => {
    if (this.state.firmStructControls.itemsIdForDelete.length === 0) return
    const itemsIdForDelete = this.state.firmStructControls.itemsIdForDelete
    const showingFirmStructSection = this.state.firmStructControls.showingFirmStructSection
    let newShowingFirmStructSection = []

    if (this.state.firmStructControls.categoryName === 'directors') {

      const newModifiedDirectors = this.removeItemsFromFirmStructSection(firmStruct.directors, itemsIdForDelete)
      // eslint-disable-next-line
      console.log('Source section \"directors\":', Object.values(firmStruct.directors))
      // eslint-disable-next-line
      console.log('New modified section \"directors\":', Object.values(newModifiedDirectors))
      newShowingFirmStructSection = Object.values(newModifiedDirectors)
      firmStruct.directors = newModifiedDirectors
    } else if (this.state.firmStructControls.categoryName === 'branches') {

      newShowingFirmStructSection = this.removeItemsFromFirmStructSection(showingFirmStructSection, itemsIdForDelete)
      switch (showingFirmStructSection[0].id) {
        case firmStruct.branches[0].id:
          // eslint-disable-next-line
          console.log('Source section \"branches\":', firmStruct.branches)
          // eslint-disable-next-line
          console.log('New modified section \"branches\":', newShowingFirmStructSection)
          firmStruct.branches = newShowingFirmStructSection
          break
        case firmStruct.branches[this.state.firmStructControls.branchesIndex].subBranches[0].id:
          // eslint-disable-next-line
          console.log('Source section \"subBranches\":', firmStruct
              .branches[this.state.firmStructControls.branchesIndex]
              .subBranches)
          // eslint-disable-next-line
          console.log('New modified section \"subBranches\":', newShowingFirmStructSection)
          firmStruct.branches[this.state.firmStructControls.branchesIndex].subBranches = newShowingFirmStructSection
          break
        case firmStruct.branches[this.state.firmStructControls.branchesIndex]
            .subBranches[this.state.firmStructControls.subBranchesIndex].employees[0].id:
          // eslint-disable-next-line
          console.log('Source section \"employees\":', firmStruct
              .branches[this.state.firmStructControls.branchesIndex]
              .subBranches[this.state.firmStructControls.subBranchesIndex].employees)
          // eslint-disable-next-line
          console.log('New modified section \"employees\":', newShowingFirmStructSection)
          firmStruct.branches[this.state.firmStructControls.branchesIndex]
              .subBranches[this.state.firmStructControls.subBranchesIndex].employees = newShowingFirmStructSection
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
    let oldArr = this.state.firmStructControls.itemsIdForDelete
    let newArr = [...this.state.firmStructControls.itemsIdForDelete]
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
    let categoryName = ''
    let setSectionIndex
    let tableStyle = 'branchesTable'
    let showingFirmStructSection = []
    let setSectionValues = {}

    if (section === 'categoryName') {
      categoryName = selectedMenuItem.split('-*-')[2]
      if (categoryName === 'branches') {
        showingFirmStructSection = cloneDeep(firmStruct[categoryName])
      } else if (categoryName === 'directors') {
        Object.keys(firmStruct.directors).forEach((key) => {
          showingFirmStructSection.push({...firmStruct.directors[key]})
        })
      }
      tableStyle = categoryName === 'directors' ? 'employeesStyle' : 'branchesStyle'
      if (categoryName === 'directors') {
        setSectionValues = {
          branchesIndex: -1,
          subBranchesIndex: -1,
          isEmployees: false,
        }
      } else if (categoryName === 'branches') {
        setSectionValues = {
          branchesIndex: -1,
          subBranchesIndex: -1,
          isEmployees: false,
        }
      }
    }
    if (section === 'branches') {
      setSectionIndex = selectedIndex
      showingFirmStructSection = cloneDeep(firmStruct.branches[selectedIndex].subBranches)
      tableStyle = 'branchesStyle'
      setSectionValues = {
        subBranchesIndex: -1,
        isEmployees: false,
      }
    }
    if (section === 'subBranches') {
      setSectionIndex = selectedIndex
      showingFirmStructSection = cloneDeep(firmStruct.branches[this.state.firmStructControls.branchesIndex]
          .subBranches[selectedIndex].employees)
      tableStyle = 'employeesStyle'
      setSectionValues = {
        isEmployees: true,
      }
    }
    this.setState({
      ...this.state,
      sortDirection: '',
      sortedColumnName: '',
      firmStructControls: {
        ...this.state.firmStructControls,
        [section + 'Index']: setSectionIndex,
        categoryName: categoryName ? categoryName : this.state.firmStructControls.categoryName,
        ...setSectionValues,
        itemsIdForDelete: [],
        tableStyle,
        showingFirmStructSection,
      }
    })
  }
  setColumnStyle = columnName =>
      cx({
        arrowDirection: this.state.sortedColumnName === columnName,
        arrowDirectionDown: this.state.sortDirection === 'ascending',
        arrowDirectionUp: this.state.sortDirection === 'descending'
      })

  render() {
    const sortDirection = this.state.sortDirection
    const columnName = this.state.sortedColumnName

// sort using built-in method
    const showingFirmStructSection = sortDirection
        ? [...this.state.firmStructControls.showingFirmStructSection]
            .sort(this.sortColumnByName(columnName, sortDirection))
        : this.state.firmStructControls.showingFirmStructSection

// sort using own method
    // const showingFirmStructSection = this.selectionSort(
    //     this.state.firmStructControls.showingFirmStructSection,
    //     sortDirection, columnName)
    if (sortDirection) {
      console.log('Source object array to show: ', this.state.firmStructControls.showingFirmStructSection)
      console.log('New sorted object array to show: ', showingFirmStructSection)
    }

    const {EmployeesTableHeader, BranchesTableHeader} = useTableComponents
    const branchesIndex = this.state.firmStructControls.branchesIndex
    const subBranchesIndex = this.state.firmStructControls.subBranchesIndex
    const isCategoryDisabled = !this.state.firmStructControls.categoryName
    const isBranchesDisabled = !(firmStruct.branches.length > 0
        && (this.state.firmStructControls.categoryName === 'branches'))
    const isSubBranchesDisabled = !(firmStruct.branches[branchesIndex]?.subBranches?.length > 0
        && this.state.firmStructControls.categoryName === 'branches')

    return (
        <Container fluid className='bg-light mb-3 pt-3 h-100'>
          <div className='middle-container '>
            <div className="d-grid gap-2 d-md-block">
              <DropdownButton
                  disabled={isCategoryDisabled}
                  className={'m-1 ms-0 me-2'}
                  as={ButtonGroup}
                  id={`dropdown-variants-primary`}
                  variant={'primary'}
                  title={this.state.firmStructControls.categoryName
                      ? this.state.firmStructControls.categoryName
                      : 'Category'}
              >
                {!isCategoryDisabled
                && Object.keys(firmStruct).map(
                    (key, i) =>
                        <Dropdown.Item
                            onSelect={this.onMenuItemSelectHandler}
                            key={key}
                            eventKey={`categoryName-*-${i}-*-${key}`}
                            active={key === this.state.firmStructControls.categoryName}
                        >{key}</Dropdown.Item>
                )}
              </DropdownButton>

              <DropdownButton
                  disabled={isBranchesDisabled}
                  className={'m-1 ms-0 me-2'}
                  as={ButtonGroup}
                  id={`dropdown-variants-primary`}
                  variant={'primary'}
                  title={this.state.firmStructControls.branchesIndex >= 0
                      ? firmStruct.branches[branchesIndex].title
                      : 'Branches'}
              >
                {!isBranchesDisabled
                && firmStruct.branches.map((item, i) =>
                    <Dropdown.Item
                        onSelect={this.onMenuItemSelectHandler}
                        key={item.id}
                        eventKey={`branches-*-${i}`}
                        active={branchesIndex === i}
                    >{item.title}</Dropdown.Item>
                )}
              </DropdownButton>

              <DropdownButton
                  disabled={isSubBranchesDisabled}
                  className={'m-1 ms-0 me-2'}
                  as={ButtonGroup}
                  id={`dropdown-variants-primary`}
                  variant={'primary'}
                  title={this.state.firmStructControls.subBranchesIndex >= 0
                      ? firmStruct.branches[branchesIndex].subBranches[subBranchesIndex].title
                      : 'Subbranches'}
              >
                {!isSubBranchesDisabled
                && firmStruct.branches[branchesIndex].subBranches.map((item, i) =>
                    <Dropdown.Item
                        onSelect={this.onMenuItemSelectHandler}
                        key={item.id}
                        eventKey={`subBranches-*-${i}`}
                        active={subBranchesIndex === i}
                    >{item.title}</Dropdown.Item>
                )}
              </DropdownButton>
            </div>
            <Table striped bordered hover>
              <thead>
              {this.state.firmStructControls.tableStyle === 'branchesStyle'
                  ? <BranchesTableHeader
                      setColumnStyle={this.setColumnStyle}
                      sortClickHandler={this.sortClickHandler}
                  />
                  : this.state.firmStructControls.tableStyle === 'employeesStyle'
                      ? <EmployeesTableHeader
                          setColumnStyle={this.setColumnStyle}
                          sortClickHandler={this.sortClickHandler}
                      />
                      : ''}
              </thead>
              <tbody>
              {this.state.firmStructControls.tableStyle === 'branchesStyle'
                  ? showingFirmStructSection.map((item, i) =>
                      <BranchesTableRow
                          id={item.id}
                          key={item.id}
                          num={i + 1}
                          text={item.title}
                          onClickTableRowHandler={this.onClickTableRowHandler}
                          itemsIdForDelete={this.state.firmStructControls.itemsIdForDelete}
                      />
                  )
                  : this.state.firmStructControls.tableStyle === 'employeesStyle'
                      ? showingFirmStructSection.map((item, i) =>
                          <EmployeesTableRow
                              key={item.id}
                              id={item.id}
                              num={i + 1}
                              name={item.name}
                              surname={item.surname}
                              salary={item.salary}
                              job={item.job}
                              onClickTableRowHandler={this.onClickTableRowHandler}
                              itemsIdForDelete={this.state.firmStructControls.itemsIdForDelete}
                          />
                      )
                      : ''}
              {
                this.state.firmStructControls.tableStyle === 'branchesStyle'
                    ? <tr>
                      <td>*</td>
                      <td>
                        <FormControl ref={this.branchNameInput} size="sm" aria-label="Small"/>
                      </td>
                    </tr>
                    : this.state.firmStructControls.tableStyle === 'employeesStyle'
                    ? <tr>
                      <td>*</td>
                      <td>
                        <FormControl ref={this.jobInput} size="sm" aria-label="Small"/>
                      </td>
                      <td>
                        <FormControl ref={this.nameInput} size="sm" aria-label="Small"/>
                      </td>
                      <td>
                        <FormControl ref={this.surnameInput} size="sm" aria-label="Small"/>
                      </td>
                      <td>
                        <FormControl ref={this.salaryInput} size="sm" aria-label="Small"/>
                      </td>
                    </tr> : <tr></tr>
              }
              </tbody>
            </Table>

            <div className="d-grid gap-2 d-md-block">
              <Button onClick={this.addDataToFirmStructHandler}
                      variant="secondary" className=''
              >Добавить</Button>
              <Button onClick={this.removeDataFromFirmStructHandler}
                      variant="secondary"
                      className='ms-md-2'
                      disabled={!this.state.firmStructControls.itemsIdForDelete.length}
              >Удалить</Button>
            </div>
          </div>
        </Container>
    )
  }
}

export default FirmStructure