import { combineReducers } from 'redux';
import firmStructure from './firmStructure/reducers';

const rootReducer = combineReducers({
  firmStructure,
});

export default rootReducer;
