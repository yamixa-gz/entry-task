import { combineReducers } from 'redux';
import firmStructure from './firmStructure/reducers';
import { pokeApi, pokemonDetails } from './pokeApi/reducers';

const rootReducer = combineReducers({
  firmStructure,
  pokeApi,
  pokemonDetails,
});

export default rootReducer;
