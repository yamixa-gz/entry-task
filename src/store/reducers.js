import { combineReducers } from 'redux';
import firmStructure from './firmStructure/reducers';
import { pokeInfo, pokemonDetails } from './pokeInfo/reducers';
import description from './description/reducers';

const rootReducer = combineReducers({
  firmStructure,
  pokeInfo,
  pokemonDetails,
  description,
});

export default rootReducer;
