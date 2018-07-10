import * as types             from './action-types';
import { getFetchMethod }     from '../assets/fetch/getFetchMethod';

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

export const fetchFriends = (payload, data) => {
  return dispatch => {
    dispatch(fetchFriendsBegin());
    return getFetchMethod(payload)(data)
    .then(res => {
      dispatch(fetchFriendsSuccess(res));
      return res;
    })
    .catch(error => dispatch(fetchFriendsFailure(error)));
  };
}

