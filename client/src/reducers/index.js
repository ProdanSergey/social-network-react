import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import userReducer from './user-reducer';
import regReducer from './reg-reducer';
import tokenReducer from './token-reducer';

// Combine Reducers
const reducers = combineReducers({
    routing: routerReducer,
    userData: userReducer,
    regState: regReducer,
    loginState: tokenReducer
});

export default reducers;