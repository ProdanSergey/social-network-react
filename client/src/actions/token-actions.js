import * as types                  from './action-types';

export const loadTokenToStore = token => ({
  type: types.LOAD_TOKEN,
  payload: { token }
});

export const deleteTokenFromStore = () => ({
    type: types.DELETE_TOKEN,
});