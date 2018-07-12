import * as types             from './action-types';
import { getFetchMethod }     from '../assets/fetch/getFetchMethod';
import { getFetchResponse }   from '../assets/fetch/getFetchResponse';

const fetchSearchBegin = () => ({
  type: types.FETCH_SEARCH_BEGIN
});

const fetchSearchSuccess = response => ({
  type: types.FETCH_SEARCH_SUCCESS,
  payload: { response }
});

const fetchSearchFailure = response => ({
  type: types.FETCH_SEARCH_FAILURE,
  payload: { response }
});

export const storeSearchResult = (search) => ({
  type: types.STORE_SEARCH_RESULT,
  payload: { search }
});

export const fetchSearch = (payload, data) => {
  return dispatch => {
    dispatch(fetchSearchBegin());
    return getFetchMethod(payload)(data)
      .then(res => getFetchResponse(dispatch, res))
      .then(response => dispatch(fetchSearchSuccess(response)))
      .catch(error => dispatch(fetchSearchFailure(error)))
  };
}


