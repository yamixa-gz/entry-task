import React, {Component} from 'react'
import './scss/App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import Description from './components/Description'

class App extends Component {
  render() {
    return (
        <div className='wrapper'>
          <Header/>
          <div className='content'>
            <div className='container'>
              <Description/>
            </div>
          </div>
          <Footer/>
        </div>
    )
  }
}

export default App
