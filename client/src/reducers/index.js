import { combineReducers } from 'redux';

// Reducers
import userReducer from './user-reducer';
import regReducer from './reg-reducer';
import langReducer from './language-reducer';

// Combine Reducers
const reducers = combineReducers({
    userData: userReducer,
    regState: regReducer,
    langState: langReducer
});

export default reducers;

//https://daveceddia.com/where-fetch-data-redux/