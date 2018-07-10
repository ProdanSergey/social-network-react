import * as types             from './action-types';
import { getFetchMethod }     from '../assets/fetch/getFetchMethod';

export const fetchSearchBegin = () => ({
  type: types.FETCH_SEARCH_BEGIN
});

export const fetchSearchSuccess = response => ({
  type: types.FETCH_SEARCH_SUCCESS,
  payload: { response }
});

export const fetchSearchFailure = response => ({
  type: types.FETCH_SEARCH_FAILURE,
  payload: { response }
});

export const fetchSearch = (payload, data) => {
  return dispatch => {
    dispatch(fetchSearchBegin());
    return getFetchMethod(payload)(data)
    .then(res => {
      dispatch(fetchSearchSuccess(res));
      return res;
    })
    .catch(error => dispatch(fetchSearchFailure(error)));
  };
}

