import * as types from './action-types';

export const addUser = user => ({
  type: types.ADD_USER,
  payload: { user }
});

export const formValid = () => ({
  type: types.FORM_VALID
});

export const formInvalid = () => ({
  type: types.FORM_INVALID
});