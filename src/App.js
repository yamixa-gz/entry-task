import React from 'react';
import './scss/App.scss';
import { Route, Switch } from 'react-router-dom';
import FetchedDataTable from './pages/FetchedDataTable/FetchedDataTable';
import FirmStructure from './pages/FirmStructure/FirmStructure';
import Description from './pages/Description/Description';
import BurgerMenu from './layout/BurgerMenu/BurgerMenu';
import menuItems from './data/menuItems';

const App = () => (
  <div className="wrapper">
    <BurgerMenu menuItems={menuItems} />
    <Switch>
      <Route path="/PokeApi" component={FetchedDataTable} />
      <Route path="/FirmStructure" component={FirmStructure} />
      <Route exect path="/" component={Description} />
    </Switch>
  </div>
);

export default App;
