import * as types from './action-types';

export const showMessage = body => ({
  type: types.SHOW_MESSAGE,
  payload: { body } 
});

export const hideMessage = () => ({
  type: types.HIDE_MESSAGE
});
