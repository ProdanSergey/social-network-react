import * as types from './action-types';

export function addUser(user) {
  return {
    type: types.ADD_USER,
    user
  };
}

export function getUser(userId) {
  return {
    type: types.GET_USER,
    userId
  };
}

export function updateUser(userProfile) {
  return {
    type: types.UPDATE_USER,
    userProfile
  };
}

export function deleteUser(userProfile) {
  return {
    type: types.DELETE_USER,
    userProfile
  };
}