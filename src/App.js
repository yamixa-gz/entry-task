import React, { Component } from 'react';
import './scss/App.scss';
import { Route, Switch } from 'react-router-dom';
import Header from './layout/Header/Header';
import Footer from './layout/Footer/Footer';
import FetchedDataTable from './pages/FetchedDataTable/FetchedDataTable';
import FirmStructure from './pages/FirmStructure/FirmStructure';
import Description from './pages/Description/Description';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="app-container">
            <Switch>
              <Route path="/task-7" component={FetchedDataTable} />
              <Route path="/task-9" component={FirmStructure} />
              <Route exect path="/" component={Description} />
            </Switch>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
