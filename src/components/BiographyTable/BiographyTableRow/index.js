import React, {Component} from 'react'
import s from './style.module.scss'

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