import * as types from '../actions/action-types';

const initialState = {
    formIsValid: false,
    user: {},
    response: {}
};

export default function logReducer(state = initialState, action) {
    switch(action.type) {
        case types.LOG_DATA:
            return { 
                ...state, 
                user: action.payload.user,
            };
        case types.LOG_FORM_VALID:
            return { 
                ...state, 
                formIsValid: true
            };
        case types.LOG_FORM_INVALID:
            return { 
                ...state, 
                formIsValid: false
            };
        case types.LOG_RESPONSE:
            return { 
                ...state, 
                response: action.payload.response
            };
        default:
            return state;
    }
}