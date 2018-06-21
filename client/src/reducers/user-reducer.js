import * as types from '../actions/action-types';

const initialState = {
    userDataIsReady: false,
    formIsValid: false,
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
        case types.STORE_USER_PASSWORD:
            return {
                ...state,
                password: action.payload.password
            }
        case types.FORM_VALID:
            return { 
                ...state, 
                formIsValid: true
            };
        case types.FORM_INVALID:
            return { 
                ...state, 
                formIsValid: false
            };
        default:
            return state;
    }
}