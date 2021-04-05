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

    activeElIndex: -1,
    hotKeyValue: '',
    newFetchedDataArr: [],
    movingElement: {},
    insertingElIndex: -1,
  }
  setPending = value => {
    this.setState({
      ...this.state,
      isPending: value
    })
  }
  setDataFromServer = data => {
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

  pageChangeHandler = pageNumber => {
    const {isPending} = this.state
    if (isPending) return
    this.getPageRequest(pageNumber)
  }
  keyPressHandler = e => {
    const {fetchedDataArr} = this.state
    this.setState({
      ...this.state, hotKeyValue: e.key,
      activeElIndex: fetchedDataArr.findIndex(el => el.hotKey === e.key)
    })
  }
  onClickHandler = (index, hotKey) => {
    this.setState({
      ...this.state,
      activeElIndex: index,
      hotKeyValue: hotKey,
    })
  }
  dragEnterHandler = index => {
    this.setState({
      ...this.state,
      insertingElIndex: index
    })
  }
  mouseDownEventHandler = index => {
    let {fetchedDataArr} = this.state
    const newFetchedDataArr = fetchedDataArr.filter((_, i) => i !== index)
    const movingElement = {...fetchedDataArr[index]}
    this.setState({
      ...this.state,
      newFetchedDataArr,
      movingElement,
      activeElIndex: index,
      insertingElIndex: index
    })
  }
  mouseUpEventHandler = () => {
    const {newFetchedDataArr, movingElement, insertingElIndex} = this.state
    let sortedFetchedDataArr = cloneDeep(newFetchedDataArr)

    sortedFetchedDataArr.splice(insertingElIndex, 0, {...movingElement})
    this.setState({
      ...this.state,
      fetchedDataArr: sortedFetchedDataArr,
      activeElIndex: -1,
      hotKeyValue: '',
    })
  }

  render() {
    const {MainDataListTableHeader} = useTableComponents
    const {
      fetchedDataArr, activePage, pagesAmount,
      activeElIndex, hotKeyValue, pageLimit, isPending,
    } = this.state
    const fetchedDataComponents = fetchedDataArr.map((item, index) =>
        <MainDataListTableRow
            dragEnterHandler={this.dragEnterHandler}
            isActive={item.hotKey === hotKeyValue}
            hotKey={item.hotKey}
            activeElIndex={activeElIndex}
            index={index}
            key={item.id}
            name={item.name ? `${this.nameCapitalize(item.name)}; HotKey: ${item.hotKey}` : 'unknown Name'}
            onClickHandler={this.onClickHandler}
            mouseUpEventHandler={this.mouseUpEventHandler}
            mouseDownEventHandler={this.mouseDownEventHandler}
        />)
    return (
        <Container fluid className='bg-light mb-3 pt-3 h-100'>
          <div className='middle-container '>
            <div className='d-flex justify-content-center mb-3'>
              <Image src='https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png'
                     alt='"PokeApi" image could be here...'
                     onLoad={e => setTimeout(() => {
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
              <tbody
              >
              {fetchedDataComponents}
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