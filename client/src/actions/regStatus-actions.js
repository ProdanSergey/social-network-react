import * as types from './action-types';

export const regResponse = response => ({
  type: types.REG_RESPONSE,
  payload: { response }
});