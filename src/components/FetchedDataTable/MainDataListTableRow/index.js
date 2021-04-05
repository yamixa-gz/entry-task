import React, {Component} from 'react'
import PokemonDetailsBtn from './PokemonDetailsBtn'

class MainDataListTableRow extends Component {

  render() {
    const {
      index, isActive, name, mouseDownEventHandler, dragEnterHandler,
      mouseUpEventHandler, onClickHandler, hotKey, activeElIndex
    } = this.props

    return (
        <tr className={isActive ? 'border border-2 border-danger' : ''}
            draggable
            onDragEnter={e => {
              if (activeElIndex === -1) return
              e.currentTarget.classList.add('border', 'border-2', 'border-info')
              dragEnterHandler(index)
            }}
            onDragLeave={e => {
              if (activeElIndex === -1) return
              e.currentTarget.classList.remove('border', 'border-2', 'border-info')
              if (activeElIndex === index) e.currentTarget.classList.add('border', 'border-2', 'border-info')
            }}
            onDragEnd={e => {
              if (!isActive) return
              e.currentTarget.classList.remove('bg-danger')
              mouseUpEventHandler(index)
            }}
            onClick={() => {
              onClickHandler(index, hotKey)
            }}
            onMouseDown={e => {
              if (!isActive) return
              e.currentTarget.classList.add('bg-danger')
              mouseDownEventHandler(index)
            }}
            onMouseUp={e => {
              if (!isActive) return
              e.currentTarget.classList.remove('bg-danger')
              mouseUpEventHandler()
            }}
        >
          <td>{name}</td>
          <td colSpan='1'><PokemonDetailsBtn/></td>
        </tr>
    )
  }
}

export default MainDataListTableRow