import React, {Component} from 'react'

class BranchesTableRow extends Component {
  render() {
    const {id, num, text,  onClickTableRowHandler, itemsIdForDelete} = this.props
    return (
        <tr onClick={()=>onClickTableRowHandler(id)}
            className={itemsIdForDelete?.includes(id) ? 'bg-danger' : ''}>
          <td>{num}</td>
          <td colSpan='1'>{text}</td>
        </tr>
    )
  }
}

export default BranchesTableRow