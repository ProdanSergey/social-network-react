import * as types from '../actions/action-types';

const initialState = {
    userDataIsReady: false,
    user: {}
};

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case types.ADD_USER:
            return { 
                ...state, 
                user: action.payload.user,
                userDataIsReady: true
            };
        default:
            return state;
    }
}