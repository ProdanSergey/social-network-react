import * as types                from './action-types';
import * as redirect             from '../constants/redirect';
import { deleteTokenFromStore }  from '../actions/token-actions';
import { getFetchMethod }        from '../assets/fetch/getFetchMethod';
import { getFetchResponse }      from '../assets/fetch/getFetchResponse';
import { removeState }           from '../assets/LocalStorage';
import { push }                  from 'connected-react-router';

const fetchUserBegin = () => ({
  type: types.FETCH_USER_BEGIN
});

const fetchUserSuccess = response => ({
  type: types.FETCH_USER_SUCCESS,
  payload: { response }
});

const fetchUserFailure = response => ({
  type: types.FETCH_USER_FAILURE,
  payload: { response }
});

export const storeUser = (user) => ({
  type: types.STORE_USER,
  payload: { user }
});

export const loginUser = () => ({
  type: types.LOGIN_USER,
});

export const logoutUser = () => ({
  type: types.LOGOUT_USER,
});

export const logout = () => {
  return dispatch => {
    removeState();
    dispatch(deleteTokenFromStore());
    dispatch(logoutUser());
    dispatch(push(redirect.LOGOUT_REDIRECT));
  }
}

export const fetchUser = (payload, data) => {
  return dispatch => {
    dispatch(fetchUserBegin());
    return getFetchMethod(payload)(data)
      .then(res => getFetchResponse(dispatch, res))
      .then(response => dispatch(fetchUserSuccess(response)))
      .catch(error => dispatch(fetchUserFailure(error)))
  };
}

