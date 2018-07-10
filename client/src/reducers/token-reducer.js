import * as types from '../actions/action-types';

export default function(state = {}, action) {
    switch(action.type) {
        case types.LOAD_TOKEN:
            return { 
                ...state, 
                token: action.payload.token,
            };
        case types.DELETE_TOKEN:
            return {
                ...state,
                token: null,
            }
        default:
            return state;
    }
}