import * as types             from './action-types';
import { getFetchMethod }     from '../assets/fetch/getFetchMethod';
import { getFetchResponse }   from '../assets/fetch/getFetchResponse';

const fetchFriendsBegin = () => ({
  type: types.FETCH_FRIENDS_BEGIN
});

const fetchFriendsSuccess = response => ({
  type: types.FETCH_FRIENDS_SUCCESS,
  payload: { response }
});

const fetchFriendsFailure = response => ({
  type: types.FETCH_FRIENDS_FAILURE,
  payload: { response }
});

export const storeFriendsResult = friends => ({
  type: types.STORE_FRIENDS_RESULT,
  payload: { friends }
});

export const fetchFriends = (payload, data) => {
  return dispatch => {
    dispatch(fetchFriendsBegin());
    return getFetchMethod(payload)(data)
      .then(res => getFetchResponse(dispatch, res))
      .then(response => dispatch(fetchFriendsSuccess(response)))
      .catch(error => dispatch(fetchFriendsFailure(error)))
  };
}

