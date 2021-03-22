import {Button} from 'react-bootstrap'
import React, {Component} from 'react'

class PokemonDetailsBtn extends Component {

  render() {

    return (
        <Button
            onClick={(e) => e.target.textContent = 'Oops... functionality isn`t realized yet))'}
            variant="outline-secondary" size="sm"
        >See details...
        </Button>
    )
  }
}

export default PokemonDetailsBtn
