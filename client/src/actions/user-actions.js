import * as types from './action-types';

export const loadUserToStore = user => ({
  type: types.LOAD_USER_TO_STORE,
  payload: { user }
});
