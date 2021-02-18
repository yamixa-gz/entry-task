import React, {Component} from 'react'

class BiographyTableRow extends Component {
  render() {
    const {num, year, text} = this.props
    return (
        <tr>
          <td>{num}</td>
          <td>{year}</td>
          <td>{text}</td>
        </tr>
    )
  }
}

export default BiographyTableRow