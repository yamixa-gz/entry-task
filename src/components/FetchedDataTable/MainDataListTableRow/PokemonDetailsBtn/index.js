import {Button} from 'react-bootstrap'
import React, {Component} from 'react'

class PokemonDetailsBtn extends Component {

  render() {
    return (
        <Button onClick={(e) => {
          alert('Oops... functionality isn`t realized yet))')
          e.stopPropagation()
        }}
                variant="outline-secondary" size="sm"
        >See details...
        </Button>
    )
  }
}

export default PokemonDetailsBtn
