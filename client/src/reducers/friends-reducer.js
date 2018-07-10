import * as types from '../actions/action-types';

const initialState = {
    fetching: false,
    ready: false,
    response: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case types.FETCH_FRIENDS_BEGIN:
            return {
              ...state,
              fetching: true,
            };
      
        case types.FETCH_FRIENDS_SUCCESS:
            return {
              ...state,
              fetching: false,
              ready: true,
              response: action.payload.response
            };
      
        case types.FETCH_FRIENDS_FAILURE:
            return {
              ...state,
              fetching: false,
              response: action.payload.response
            };
        default:
            return state;
    }
}