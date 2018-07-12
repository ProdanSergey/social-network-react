import * as types from '../actions/action-types';

const initialState = {
    fetching: false,
    ready: false,
    response: {},
    search: {}
};

export default function(state = initialState, action) {
    switch(action.type) {
        case types.FETCH_SEARCH_BEGIN:
            return {
              ...state,
              fetching: true,
            };
      
        case types.FETCH_SEARCH_SUCCESS:
            return {
              ...state,
              fetching: false,
              response: action.payload.response
            };
      
        case types.FETCH_SEARCH_FAILURE:
            return {
              ...state,
              fetching: false,
              response: action.payload.response
            };
        case types.STORE_SEARCH_RESULT:
            return {
              ...state,
              ready: true,
              search: action.payload.search,
            };
        default:
            return state;
    }
}