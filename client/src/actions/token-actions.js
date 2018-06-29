import * as types       from './action-types';
import { removeState }  from '../assets/LocalStorage';

export const loadTokenToStore = token => ({
  type: types.LOAD_TOKEN,
  payload: { token }
});
export const deleteTokenFromStore = () => ({
    type: types.DELETE_TOKEN,
});


export const logout = () => {
  return dispatch => {
    dispatch(deleteTokenFromStore());
    removeState();
  }
}