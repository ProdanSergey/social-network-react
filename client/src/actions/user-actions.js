import * as types             from './action-types';
import { getFetchMethod }     from '../assets/fetch/getFetchMethod';
import { getFetchResponse }   from '../assets/fetch/getFetchResponse';

export const fetchUserBegin = () => ({
  type: types.FETCH_USER_BEGIN
});

export const fetchUserSuccess = response => ({
  type: types.FETCH_USER_SUCCESS,
  payload: { response }
});

export const fetchUserFailure = response => ({
  type: types.FETCH_USER_FAILURE,
  payload: { response }
});

export const fetchShowMessage = () => ({
  type: types.FETCH_SHOW_MESSAGE
});

export const fetchHideMessage = () => ({
  type: types.FETCH_HIDE_MESSAGE
});

export const fetchUser = (data, payload) => {
  return (dispatch, getState) => {
    dispatch(fetchUserBegin());
    return getFetchMethod(payload)(data)
    .then(res => {
      dispatch(fetchUserSuccess(res));
      return res;
    })
    .then(res => getFetchResponse(dispatch, getState, res))
    .catch(error => dispatch(fetchUserFailure(error)));
  };
}

