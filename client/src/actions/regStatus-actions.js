import * as types from './action-types';

export function toogleRegStatus(status) {
  return {
    type: types.REG_SUCCESS,
    status
  };
}
