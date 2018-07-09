import * as types from './action-types';
import { validateInput } from '../assets/validateInput';

export const storeFieldData = (name, type, value) => ({
  type: types.STORE_FIELD_DATA,
  payload: {
    [name]: {
      value,
      valid: validateInput(type, value),
      filled: !!value
    }
  }
});

export const formValid = () => ({
  type: types.FORM_VALID
});

export const formInvalid = () => ({
  type: types.FORM_INVALID
});

export const clearFormData = () => ({
  type: types.CLEAR_FORM_DATA
});