import React, { Component } from 'react';
import './scss/App.scss';
import { Route, Switch } from 'react-router-dom';
import FetchedDataTable from './pages/FetchedDataTable/FetchedDataTable';
import FirmStructure from './pages/FirmStructure/FirmStructure';
import Description from './pages/Description/Description';
import { EN } from './constants/firmStructureElements';
import withAppLanguageProvider from './HOC/withAppLanguageProvider';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appLanguage: EN,
      toggleLanguage: this.toggleLanguage,
    };
  }

  toggleLanguage = (language) => {
    this.setState((state) => ({
      ...state,
      appLanguage: language
    }));
  }

  render() {
    return (
      <div className="wrapper">
        <Switch>
          <Route path="/task-7" component={FetchedDataTable} />
          <Route path="/task-11" component={withAppLanguageProvider(this.state)(FirmStructure)} />
          <Route exect path="/" component={Description} />
        </Switch>
      </div>
    );
  }
}

export default App;
