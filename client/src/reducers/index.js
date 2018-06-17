import { combineReducers } from 'redux';

// Reducers
import userReducer from './user-reducer';
import regReducer from './reg-reducer';
import langReducer from './language-reducer';

// Combine Reducers
const reducers = combineReducers({
    userData: userReducer,
    userRegStatus: regReducer,
    langState: langReducer
});

export default reducers;