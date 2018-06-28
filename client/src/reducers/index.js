import { combineReducers } from 'redux';

// Reducers
import regReducer from './reg-reducer';
import logReducer from './log-reducer';
import userReducer from './user-reducer';
import tokenReducer from './token-reducer';

// Combine Reducers
const reducers = combineReducers({
    regData: regReducer,
    loginData: logReducer,
    userData: userReducer,
    tokenState: tokenReducer
});

export default reducers;