import React from 'react';
import './scss/App.scss';
import { Route, Switch } from 'react-router-dom';
import FetchedDataTable from './pages/FetchedDataTable/FetchedDataTable';
import FirmStructure from './pages/FirmStructure/FirmStructure';
import Description from './pages/Description/Description';

const App = () => (
  <div className="wrapper">
    <Switch>
      <Route path="/task-7" component={FetchedDataTable} />
      <Route path="/task-11" component={FirmStructure} />
      <Route exect path="/" component={Description} />
    </Switch>
  </div>
);

export default App;
