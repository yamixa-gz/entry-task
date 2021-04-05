import React, {Component} from 'react'
import PokemonDetailsBtn from './PokemonDetailsBtn'

class MainDataListTableRow extends Component {
  state = {pageY: 0, startPageY: 0, scrollY: 0}
  mouseMoveHandler = e => {
    this.setState({
      pageY: e.pageY,
    })
  }

  render() {
    const {
      index, isActive, name, mouseDownEventHandler,
      mouseUpEventHandler, onClickHandler, hotKey, resetSelection,
      tableRowMetrics: {
        rowTop, rowWidth,
        nameCellWidth, descriptionCellWidth
      }
    } = this.props
    const {pageY, startPageY, scrollY} = this.state
    const rowStyle = {
      top: rowTop + scrollY - (startPageY - pageY),
      width: rowWidth,
    }
    return (
        <tr style={isActive ? rowStyle : {}} className={isActive ? 'border border-2 border-danger' : ''}
            onClick={e => {
              onClickHandler({index, isActive, hotKey})
            }}
            onMouseLeave={e => {
              if (!isActive) return
              e.currentTarget.classList.remove('position-absolute')
              e.currentTarget.removeEventListener('mousemove', this.mouseMoveHandler)
              resetSelection()
            }}
            onMouseDown={e => {
              if (!isActive) return
              e.currentTarget.addEventListener('mousemove', this.mouseMoveHandler)
              this.setState({...this.state, pageY: e.pageY, startPageY: e.pageY, scrollY: e.pageY - e.clientY})

              mouseDownEventHandler({trTag: e.currentTarget, index})
            }}
            onMouseUp={e => {
              if (!isActive) return
              this.setState({...this.state, pageY: e.pageY, startPageY: e.pageY, scrollY: e.pageY - e.clientY})
              e.currentTarget.removeEventListener('mousemove', this.mouseMoveHandler)

              mouseUpEventHandler({
                trTag: e.currentTarget,
                offsetPosition: e.pageY
              })
            }}
        >
          <td style={isActive ? {width: nameCellWidth} : {}}>{name}</td>
          <td style={isActive ? {width: descriptionCellWidth} : {}} colSpan='1'><PokemonDetailsBtn/></td>
        </tr>
    )
  }
}

export default MainDataListTableRow