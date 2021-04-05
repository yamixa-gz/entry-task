import {Table} from 'react-bootstrap'
import {BRANCHES_STYLE, EMPLOYEES_STYLE, EMPTY_STRING} from '../common/constants'
import BranchesTableRow from './BranchesTableRow'
import EmployeesTableRow from './EmployeesTableRow'
import React, {Component} from 'react'
import useTableComponents from '../common/useTableComponents'

class FirmStructureTable extends Component {

  render() {
    const {sortClickHandler, onClickTableRowHandler, setColumnStyle,
      tableStyle, itemsIdForDelete, showingFirmStructSection} = this.props
    const {EmployeesTableHeader, BranchesTableHeader} = useTableComponents
    return <Table striped bordered hover>
      <thead>
      {tableStyle === BRANCHES_STYLE
          ? <BranchesTableHeader
              setColumnStyle={setColumnStyle}
              sortClickHandler={sortClickHandler}
          />
          : tableStyle === EMPLOYEES_STYLE
              ? <EmployeesTableHeader
                  setColumnStyle={setColumnStyle}
                  sortClickHandler={sortClickHandler}
              />
              : EMPTY_STRING}
      </thead>
      <tbody>
      {tableStyle === BRANCHES_STYLE
          ? showingFirmStructSection.map((item, i) =>
              <BranchesTableRow
                  id={item.id}
                  key={item.id}
                  num={i + 1}
                  text={item.title}
                  onClickTableRowHandler={onClickTableRowHandler}
                  itemsIdForDelete={itemsIdForDelete}
              />
          )
          : tableStyle === EMPLOYEES_STYLE
              ? showingFirmStructSection.map((item, i) =>
                  <EmployeesTableRow
                      key={item.id}
                      id={item.id}
                      num={i + 1}
                      name={item.name}
                      surname={item.surname}
                      salary={item.salary}
                      job={item.job}
                      onClickTableRowHandler={onClickTableRowHandler}
                      itemsIdForDelete={itemsIdForDelete}
                  />
              )
              : EMPTY_STRING}
      </tbody>
    </Table>
  }



}

export default FirmStructureTable