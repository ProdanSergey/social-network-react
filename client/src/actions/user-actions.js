import * as types from './action-types';
import * as methods from '../constants/fetch';
import { addUser, getUser, authenticateUser } from '../assets/fetchData';

export const fetchUserBegin = () => ({
  type: types.FETCH_USER_BEGIN
});

export const fetchUserSuccess = response => ({
  type: types.FETCH_USER_SUCCESS,
  payload: { response }
});

export const fetchUserFailure = error => ({
  type: types.FETCH_USER_FAILURE,
  payload: { error }
});

export const fetchUser = (data, method) => {
  return dispatch => {
    dispatch(fetchUserBegin());
    switch(method) {
      case methods.ADD_USER:
        return addUser(data).then(res => {
          dispatch(fetchUserSuccess(res))
          return res;
        })
        .catch(error => dispatch(fetchUserFailure(error)));
      case methods.GET_USER:
        return getUser(data).then(res => {
          dispatch(fetchUserSuccess(res))
          return res;
        })
        .catch(error => dispatch(fetchUserFailure(error)));
      case methods.AUTH_USER:
        return authenticateUser(data).then(res => {
          dispatch(fetchUserSuccess(res))
          return res;
        })
        .catch(error => dispatch(fetchUserFailure(error)));
      default:
        return false;
    }
  };
}