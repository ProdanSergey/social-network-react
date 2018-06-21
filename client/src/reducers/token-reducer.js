import * as types from '../actions/action-types';

export default function tokenReducer(state = {}, action) {
    switch(action.type) {
        case types.LOAD_TOKEN:
            return { 
                ...state, 
                token: action.payload.token,
                userIsAuthorized: true
            };
        case types.DELETE_TOKEN:
            return {
                ...state,
                token: null,
                userIsAuthorized: false
            }
        default:
            return state;
    }
}