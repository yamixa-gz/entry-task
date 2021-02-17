import React, {Component} from 'react'
import './scss/App.scss'
import Header from './components/Header'
import Footer from './components/Footer'
import Description from './components/Description'
import Biography from "./components/BiographyTable";

class App extends Component {
  render() {
    return (
        <div className='wrapper'>
          <Header/>
          <div className='content'>
            <div className='app-container'>
              <Description/>
              <Biography/>
            </div>
          </div>
          <Footer/>
        </div>
    )
  }
}

export default App
