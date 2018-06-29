import * as types from '../actions/action-types';

const initialState = {
    fetching: false,
    response: {}
};

export default function registrationReducer(state = initialState, action) {
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
        default:
            return state;
    }
}