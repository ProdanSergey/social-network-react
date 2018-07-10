import * as types             from './action-types';
import { getFetchMethod }     from '../assets/fetch/getFetchMethod';
import { getFetchResponse }   from '../assets/fetch/getFetchResponse';

const fetchUserBegin = () => ({
  type: types.FETCH_USER_BEGIN
});

export const fetchUserSuccess = response => ({
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

export const fetchUser = (payload, data) => {
  console.log(payload, data)
  return dispatch => {
    dispatch(fetchUserBegin());
    return getFetchMethod(payload)(data)
    .then(res => getFetchResponse(dispatch, res))
    .catch(error => dispatch(fetchUserFailure(error)));
  };
}

