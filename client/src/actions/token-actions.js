import * as types                  from './action-types';
import { removeState, saveState }  from '../assets/LocalStorage';
import { push }                    from 'connected-react-router';
import { fetchUser }               from '../actions/user-actions';

const loadTokenToStore = token => ({
  type: types.LOAD_TOKEN,
  payload: { token }
});

const deleteTokenFromStore = () => ({
    type: types.DELETE_TOKEN,
});

export const relogin = (token, method) => {
  return dispatch => {
    dispatch(loadTokenToStore(token));
    dispatch(fetchUser(token, method));
  };
}

export const login = (token) => {
  return dispatch => {
    saveState(token);
    dispatch(loadTokenToStore(token));
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(deleteTokenFromStore());
    dispatch(push('/'));
    removeState();
  }
}