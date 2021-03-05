import React, {Component} from 'react'

class EmployeesTableRow extends Component {
  render() {
    const {id, num, job, name, surname, salary, onClickTableRowHandler, itemsIdForDelete} = this.props
    return (
        <tr onClick={()=>onClickTableRowHandler(id)}
            className={itemsIdForDelete?.includes(id) ? 'bg-danger' : ''}>
          <td>{num}</td>
          <td>{job}</td>
          <td>{name}</td>
          <td>{surname}</td>
          <td>{salary}</td>
        </tr>)
  }
}

export default EmployeesTableRow