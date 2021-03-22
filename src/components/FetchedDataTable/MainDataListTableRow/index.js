import React, {Component} from 'react'
import PokemonDetailsBtn from './PokemonDetailsBtn'

class MainDataListTableRow extends Component {
  render() {
    const {name} = this.props
    return (
        <tr>
          <td>{name}</td>
          <td colSpan='1'><PokemonDetailsBtn/></td>
        </tr>
    )
  }
}

export default MainDataListTableRow