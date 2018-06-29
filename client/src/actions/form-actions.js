import * as types from './action-types';

export const storeFieldData = (name, value, flag) => ({
  type: types.STORE_FIELD_DATA,
  payload: {
    name,
    value,
    valid: flag
  }
});