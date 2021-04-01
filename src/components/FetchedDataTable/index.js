import React, {Component} from 'react'
import {
  Table,
  Container,
  Image
} from 'react-bootstrap'
import useTableComponents from './common/useTableComponents'
import cloneDeep from 'lodash.clonedeep'
import uuid from 'react-uuid'
import MainDataListTableRow from './MainDataListTableRow'
import Pagination from 'react-js-pagination'
import Preloader from '../common/Preloader'

const BASE_URL = 'https://pokeapi.co/api/v2/'

class FetchedDataTable extends Component {
  state = {
    isPending: false,
    fetchedDataArr: [],
    pageLimit: 20,
    pagesAmount: 0,
    activePage: 1,
    tableRowMetrics: {
      nameCellWidth: 0,
      descriptionCellWidth: 0,
      rowTop: 0,
      rowWidth: 0,
      rowHeight: 0,
    },
    isSelection: false,
    activeElIndex: -1,
    hotKeyValue: '',
    startPosition: 0,
    newFetchedDataArr: [],
    movingElement: {}
  }
  setPending = (value) => {
    this.setState({
      ...this.state,
      isPending: value
    })
  }
  setDataFromServer = (data) => {
    const fetchedDataArr = data.results.map((item, index) => (
        {
          id: uuid(),
          hotKey: String.fromCharCode(97 + index),
          ...item
        }
    ))
    this.setState({
      ...this.state,
      fetchedDataArr,
      pagesAmount: data.count,
    })
  }
  getPageRequest = async pageNumber => {
    const {pageLimit} = this.state
    this.setPending(true)
    try {
      const response = await fetch(BASE_URL
          + `pokemon?limit=${pageLimit}&offset=${pageNumber * pageLimit - pageLimit}`)
      if (response.ok) {
        this.setDataFromServer(await response.json())
        this.setState({
          activePage: pageNumber,
          isPending: false
        })
      } else {
        this.setPending(false)
        if (response.status === 404) {
          console.error('Required address don`t exist! :(')
        } else if (response.status === 500) {
          console.error('Unexpected server error... :(')
        } else {
          console.error('Unknown error... :(')
        }
      }
    } catch (e) {
      this.setPending(false)
      console.error('Something went wrong...', e)
    }
  }
  nameCapitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

  componentDidMount() {
    const {activePage} = this.state
    document.addEventListener('keypress', this.keyPressHandler)
    this.getPageRequest(activePage)
  }

  pageChangeHandler = (pageNumber) => {
    const {isPending} = this.state
    if (isPending) return
    this.getPageRequest(pageNumber)
  }
  keyPressHandler = (e) => {
    this.setState({
      ...this.state, hotKeyValue: e.key,
      activeElIndex: -1
    })
  }
  resetSelection = () => {
    this.setState({
      ...this.state,
      activeElIndex: -1,
      hotKeyValue: ''
    })
  }
  onClickHandler = ({index, isActive, hotKey}) => {
    if (isActive) return
    const {hotKeyValue} = this.state
    this.setState({
      ...this.state,
      activeElIndex: hotKeyValue === '' ? index : -1,
      hotKeyValue: hotKeyValue === '' ? '' : hotKey
    })
  }
  mouseDownEventHandler = ({trTag, index}) => {
    let {fetchedDataArr} = this.state
    const {top: rowTop, width: rowWidth, height: rowHeight} = trTag.getBoundingClientRect()
    const [nameCellWidth, descriptionCellWidth] = [trTag.cells[0].clientWidth, trTag.cells[1].clientWidth]
    const newFetchedDataArr = fetchedDataArr.filter((_, i) => i !== index)
    const movingElement = {...fetchedDataArr[index]}
    trTag.classList.add('position-absolute')

    this.setState({
      ...this.state,
      tableRowMetrics: {
        ...this.state.tableRowMetrics,
        nameCellWidth,
        descriptionCellWidth,
        rowTop,
        rowWidth,
        rowHeight,
      },
      isSelection: true,
      newFetchedDataArr,
      movingElement,
    })
  }
  mouseUpEventHandler = ({trTag, offsetPosition}) => {
    const {tableRowMetrics: {rowHeight}, newFetchedDataArr, movingElement} = this.state
    let sortedFetchedDataArr = cloneDeep(newFetchedDataArr)
    // measure tableBody top to page beginning. (tableBody + table)
    const startPosition = trTag.parentNode.offsetTop + trTag.parentNode.parentNode.offsetTop
    let foundIndex = null

    for (let i = 1; i < newFetchedDataArr.length + 1; i++) {
      if ((offsetPosition + 10) <= (startPosition + rowHeight * i)) {
        foundIndex = i
        break
      }
    }
    sortedFetchedDataArr.splice(foundIndex, 0, {...movingElement})
    this.setState({
          ...this.state,
          fetchedDataArr: sortedFetchedDataArr,
          activeElIndex: -1,
          hotKeyValue: '',
          isSelection: false,
        }
    )
    trTag.classList.remove('position-absolute')
  }

  render() {
    const {MainDataListTableHeader} = useTableComponents
    const {
      fetchedDataArr, activePage, pagesAmount, pageLimit, isPending,
      activeElIndex, hotKeyValue, tableRowMetrics, isSelection
    } = this.state
    const fetchedDataComponents = fetchedDataArr.map((item, index) =>
        <MainDataListTableRow
            hotKey={item.hotKey}
            resetSelection={this.resetSelection}
            isActive={(activeElIndex === index) || (item.hotKey === hotKeyValue)}
            index={index}
            key={item.id}
            name={item.name ? `${this.nameCapitalize(item.name)}; HotKey: ${item.hotKey}` : 'unknown Name'}
            onClickHandler={this.onClickHandler}
            mouseUpEventHandler={this.mouseUpEventHandler}
            mouseDownEventHandler={this.mouseDownEventHandler}
            tableRowMetrics={tableRowMetrics}
        />)
    return (
        <Container fluid className='bg-light mb-3 pt-3 h-100'>
          <div className='middle-container '>
            <div className='d-flex justify-content-center mb-3'>
              <Image src='https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png'
                     alt='"PokeApi" image could be here...'
                     onLoad={(e) => setTimeout(() => {
                       alert(`"PokeApi" image loaded successfully, size ${e.target.width}x${e.target.height}`)
                     }, 1000)}
                     onError={() => setTimeout(() => {
                       alert('"PokeApi" image loading crashed...')
                     }, 1000)}
              />
            </div>
            <Table className='mb-5' striped bordered hover>
              <thead>
              <MainDataListTableHeader/>
              </thead>
              <tbody className='position-relative'>
              {fetchedDataComponents}
              <tr style={isSelection ? {height: tableRowMetrics.rowHeight} : {}}/>
              </tbody>
            </Table>
            <div className='position-relative'>
              {isPending ? <Preloader/> : ''}
              <Pagination
                  itemClass='page-item'
                  linkClass='page-link'
                  innerClass='pagination justify-content-center'
                  itemsCountPerPage={pageLimit}
                  totalItemsCount={pagesAmount}
                  pageRangeDisplayed={5}
                  activePage={activePage}
                  onChange={this.pageChangeHandler}
              />
            </div>
          </div>
        </Container>
    )
  }
}

export default FetchedDataTable