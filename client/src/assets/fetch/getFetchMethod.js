import { 
    addUser, 
    getUser, 
    authenticateUser, 
    editUserInformation,
    searchUsers
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
      default:
        return false;
    }
}