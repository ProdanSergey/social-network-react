import * as types from '../actions/action-types';

const initialState = {
    user: {},
    userDataIsReady: false,
    formIsValid: false
};

export default function logReducer(state = initialState, action) {
    switch(action.type) {
        case types.ADD_USER:
            return { 
                ...state,
                user: action.payload.user,
                userDataIsReady: true
            };
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