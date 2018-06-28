import * as types from '../actions/action-types';

export default function userReducer(state = {}, action) {
    switch(action.type) {
        case types.LOAD_USER_TO_STORE:
            return { 
                ...state, 
                user: action.payload.user,
            };
        default:
            return state;
    }
}