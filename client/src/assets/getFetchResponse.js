import { login }              from '../actions/token-actions';

export const getFetchResponse = (dispatch, res) => {
    if(res.authorized) {
        dispatch(login(res.token));
        return {...res, redirect: true, path: '/'};
    }
    return res;
}