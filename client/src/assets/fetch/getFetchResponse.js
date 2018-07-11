import { 
    storeUser,
    loginUser }               from '../../actions/user-actions';
import { storeSearchResult }  from '../../actions/search-actions';
import { storeFriendsResult } from '../../actions/friends-actions';
import { push }               from 'connected-react-router';

import { saveState }          from '../LocalStorage';

export const getFetchResponse = (dispatch, res) => {
    const { 
        response,
        response: {
            authorized, 
            registered, 
            authenticated
        },
        token, 
        user,
        search,
        friends
    } = res;
    if (user) dispatch(storeUser(user));
    if (search) dispatch(storeSearchResult(search));
    if (friends) dispatch(storeFriendsResult(friends));
    if (token) {
            saveState(token);
            dispatch(loginUser());
            dispatch(push('/'));
    }
    if (authenticated) {
        dispatch(loginUser());
    }
    return response;
}