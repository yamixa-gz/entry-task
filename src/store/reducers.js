import { combineReducers } from 'redux';
import firmStructure from './firmStructure/reducers';
import { pokeApi, pokemonDetails } from './pokeApi/reducers';
import description from './descriptions/reducers';

const rootReducer = combineReducers({
  firmStructure,
  pokeApi,
  pokemonDetails,
  description,
});

export default rootReducer;
