import React, {Component} from 'react'
import './scss/App.scss'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
// eslint-disable-next-line
import FetchedDataTable from './components/FetchedDataTable/FetchedDataTable'
// eslint-disable-next-line
import FirmStructure from './components/FirmStructure/FirmStructure'
class App extends Component {
  render() {
    return (
        <div className='wrapper'>
          <Header/>
          <div className='content'>
            <div className='app-container'>
              <FirmStructure/>
              {/*<FetchedDataTable/>*/}
            </div>
          </div>
          <Footer/>
        </div>
    )
  }
}

export default App
