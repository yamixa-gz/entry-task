import React, {Component} from 'react'
import './scss/App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
// eslint-disable-next-line
import FetchedDataTable from './components/FetchedDataTable'
// eslint-disable-next-line
import FirmStructureContainer from './components/FirmStructure/FirmStructureContainer'
class App extends Component {
  render() {
    return (
        <div className='wrapper'>
          <Header/>
          <div className='content'>
            <div className='app-container'>
              {/*<FirmStructureContainer/>*/}
              <FetchedDataTable/>
            </div>
          </div>
          <Footer/>
        </div>
    )
  }
}

export default App
