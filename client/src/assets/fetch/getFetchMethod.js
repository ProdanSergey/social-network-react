import { 
    addUser, 
    getUser, 
    authenticateUser, 
    editUserInformation,
    searchUsers,
    addFriend,
    getFriends
  } from './fetchData';
import * as methods       from '../../constants/fetch';

export const getFetchMethod = payload => {
    switch(payload) {
      case methods.ADD_USER:
        return addUser;
      case methods.GET_USER:
        return getUser;
      case methods.AUTH_USER:
        return authenticateUser;
      case methods.PUT_USER:
        return editUserInformation;
      case methods.SEARCH_USERS:
        return searchUsers;
      case methods.ADD_FRIEND:
        return addFriend;
      case methods.GET_FRIENDS:
        return getFriends;
      default:
        return false;
    }
}