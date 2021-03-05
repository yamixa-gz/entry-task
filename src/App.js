import React, {Component} from 'react'
import './scss/App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import FirmStructure from './components/FirmStructure'

class App extends Component {
  render() {
    return (
        <div className='wrapper'>
          <Header/>
          <div className='content'>
            <div className='app-container'>
              <FirmStructure/>
            </div>
          </div>
          <Footer/>
        </div>
    )
  }
}

export default App
