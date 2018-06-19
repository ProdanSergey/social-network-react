import * as types from './action-types';

export const addUser = user => ({
  type: types.ADD_USER,
  payload: { user }
});