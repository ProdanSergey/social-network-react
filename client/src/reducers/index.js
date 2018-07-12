import { combineReducers } from 'redux';

import formReducer         from './form-reducer';
import userReducer         from './user-reducer';
import tokenReducer        from './token-reducer';
import searchReducer       from './search-reducer';
import friendsReducer      from './friends-reducer';
import messageReducer      from './message-reducer';

const reducers = combineReducers({
    formData: formReducer,
    userData: userReducer,
    tokenState: tokenReducer,
    searchData: searchReducer,
    friendsData: friendsReducer,
    messageData: messageReducer
});

export default reducers;