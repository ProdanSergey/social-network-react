import { 
    storeUser,
    loginUser }               from '../../actions/user-actions';
import { storeSearchResult }  from '../../actions/search-actions';
import { storeFriendsResult } from '../../actions/friends-actions';
import { showMessage }        from '../../actions/message-action';
import { push }               from 'connected-react-router';
import * as redirect          from '../../constants/redirect';
import { saveState }          from '../LocalStorage';

export const getFetchResponse = (dispatch, res) => {
    const { 
        response,
        response: {
            authenticated,
            alert
        },
        token, 
        user,
        search,
        friends
    } = res;
    if (alert) dispatch(showMessage(response));
    if (user) dispatch(storeUser(user));
    if (search) dispatch(storeSearchResult(search));
    if (friends) dispatch(storeFriendsResult(friends));
    if (token) {
            saveState(token);
            dispatch(loginUser());
            dispatch(push(redirect.REGISTRATION_LOGIN_REDIRECT));
    }
    if (authenticated) dispatch(loginUser());
    return response;
}