import * as types from './action-types';

export const regSuccess = () => ({
  type: types.REG_SUCCESS
});

export const regFailed = () => ({
  type: types.REG_FAILED
});

export const regSuccessAlert = alertText => ({
  type: types.REG_SUCCESS_TEXT,
  payload: { alertText }
});