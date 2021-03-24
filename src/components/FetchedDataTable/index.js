import React, {Component} from 'react'
import {
  Table,
  Container,
} from 'react-bootstrap'
import useTableComponents from './common/useTableComponents'
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
  }
  setPending = (value) => {
    this.setState({
      ...this.state,
      isPending: value
    })
  }
  setDataFromServer = (data) => {
    const fetchedDataArr = data.results.map(item => ({id: uuid(), ...item}))
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
      }
    } catch (e) {
      this.setPending(false)
      console.error('Something went wrong...', e)
    }
  }

  nameCapitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

  componentDidMount() {
    const {activePage} = this.state
    this.getPageRequest(activePage)
  }

  pageChangeHandler = (pageNumber) => {
    const {isPending} = this.state
    if (isPending) return
    this.getPageRequest(pageNumber)
  }

  render() {
    const {MainDataListTableHeader} = useTableComponents
    const {fetchedDataArr, activePage, pagesAmount, pageLimit, isPending} = this.state
    const fetchedDataComponents = fetchedDataArr.map(item =>
        <MainDataListTableRow
            key={item.id}
            name={item.name ? this.nameCapitalize(item.name) : 'unknown Name'}
        />)
    return (
        <Container fluid className='bg-light mb-3 pt-3 h-100'>
          <div className='middle-container '>
            <Table className='mb-5' striped bordered hover>
              <thead>
              <MainDataListTableHeader/>
              </thead>
              <tbody>
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