import * as types from '../actions/action-types';

const initialState = {
    fetching: false,
    ready: false,
    isLogin: false,
    response: {},
    user: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case types.FETCH_USER_BEGIN:
            return {
              ...state,
              fetching: true,
            };
        case types.FETCH_USER_SUCCESS:
            return {
              ...state,
              fetching: false,
              response: action.payload.response
            };
      
        case types.FETCH_USER_FAILURE:
            return {
              ...state,
              fetching: false,
              response: action.payload.response
            };
        case types.STORE_USER:
            return {
              ...state,
              ready: true,
              user: action.payload.user,
            };
        case types.LOGIN_USER:
            return {
              ...state,
              isLogin: true,
            };
        case types.LOGOUT_USER:
            return {
              ...state,
              isLogin: false,
            };
        default:
            return state;
    }
}