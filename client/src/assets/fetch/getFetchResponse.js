import { login }      from '../../actions/token-actions';
import { 
    storeUser,
    fetchUserSuccess
}                     from '../../actions/user-actions';
import { push }       from 'connected-react-router';

export const getFetchResponse = (dispatch, res) => {
    const { 
        response,
        response: {
            authorized, 
            registered, 
            authenticated
        },
        token, 
        user
    } = res
    if(authorized || registered) {
        dispatch(login(token));
        dispatch(push('/'));
    }
    if(authenticated) {
        dispatch(storeUser(user));
    }
    dispatch(fetchUserSuccess(response));
    return res;
}