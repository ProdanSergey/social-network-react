import * as types                  from './action-types';
import { logoutUser }              from '../actions/user-actions';
import { removeState }             from '../assets/LocalStorage';
import { push }                    from 'connected-react-router';


export const loadTokenToStore = token => ({
  type: types.LOAD_TOKEN,
  payload: { token }
});

export const deleteTokenFromStore = () => ({
    type: types.DELETE_TOKEN,
});


export const logout = () => {
  return dispatch => {
    removeState();
    dispatch(deleteTokenFromStore());
    dispatch(logoutUser());
    dispatch(push('/'));
  }
}