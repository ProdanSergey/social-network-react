import * as types from './action-types';

export const regData = user => ({
  type: types.REG_DATA,
  payload: { user }
});

export const regFormValid = () => ({
  type: types.REG_FORM_VALID
});

export const regFormInvalid = () => ({
  type: types.REG_FORM_INVALID
});

export const regResponse = response => ({
  type: types.REG_RESPONSE,
  payload: { response }
});