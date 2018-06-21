import * as types from './action-types';

export const addUser = user => ({
  type: types.ADD_USER,
  payload: { user }
});

export const storePassword = password => ({
  type: types.STORE_USER_PASSWORD,
  payload: { password }
});


export const formValid = () => ({
  type: types.FORM_VALID
});

export const formInvalid = () => ({
  type: types.FORM_INVALID
});