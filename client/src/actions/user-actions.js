import * as types from './action-types';
import { getFetchMethod } from '../assets/getFetchMethod';
import { getFetchResponse } from '../assets/getFetchResponse';
import { push }               from 'connected-react-router';

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

export const fetchUser = (data, payload) => {
  return dispatch => {
    dispatch(fetchUserBegin());
    return getFetchMethod(payload)(data)
    .then(res => {
      dispatch(fetchUserSuccess(res));
      return res;
    })
    .then(res => getFetchResponse(dispatch, res))
    .then(res => {
      const { redirect, path } = res
      if(redirect) dispatch(push(path))
    })
    .catch(error => dispatch(fetchUserFailure(error)));
  };
}

