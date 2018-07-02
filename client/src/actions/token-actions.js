import * as types                  from './action-types';
import { removeState, saveState }  from '../assets/LocalStorage';

export const loadTokenToStore = token => ({
  type: types.LOAD_TOKEN,
  payload: { token }
});
export const deleteTokenFromStore = () => ({
    type: types.DELETE_TOKEN,
});

export const login = (token) => {
  return dispatch => {
    saveState(token);
    dispatch(loadTokenToStore(token));
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(deleteTokenFromStore());
    removeState();
  }
}