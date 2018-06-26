import { combineReducers } from 'redux';

// Reducers
import regReducer from './reg-reducer';
import logReducer from './log-reducer';
import tokenReducer from './token-reducer';

// Combine Reducers
const reducers = combineReducers({
    regData: regReducer,
    loginData: logReducer,
    tokenState: tokenReducer
});

export default reducers;