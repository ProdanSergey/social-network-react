import * as types from './action-types';

export const loadTokenToStore = token => ({
  type: types.LOAD_TOKEN,
  payload: { token }
});
export const deleteTokenFromStore = token => ({
    type: types.DELETE_TOKEN,
    payload: { token }
});