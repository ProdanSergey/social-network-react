import { combineReducers } from 'redux';

import formReducer         from './form-reducer';
import userReducer         from './user-reducer';
import tokenReducer        from './token-reducer';

const reducers = combineReducers({
    formData: formReducer,
    userData: userReducer,
    tokenState: tokenReducer
});

export default reducers;