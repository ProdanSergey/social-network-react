import * as types from './action-types';

export const logData = user => ({
  type: types.LOG_DATA,
  payload: { user }
});

export const logFormValid = () => ({
  type: types.LOG_FORM_VALID
});

export const logFormInvalid = () => ({
  type: types.LOG_FORM_INVALID
});

export const logResponse = response => ({
  type: types.LOG_RESPONSE,
  payload: { response }
});