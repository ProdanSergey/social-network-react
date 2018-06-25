import * as types from '../actions/action-types';

const initialState = {
    formIsValid: false,
    user: {},
    response: {}
};

export default function regReducer(state = initialState, action) {
    switch(action.type) {
        case types.REG_DATA:
            return { 
                ...state, 
                user: action.payload.user,
            };
        case types.REG_FORM_VALID:
            return { 
                ...state, 
                formIsValid: true
            };
        case types.REG_FORM_INVALID:
            return { 
                ...state, 
                formIsValid: false
            };
        case types.REG_RESPONSE:
            return { 
                ...state, 
                response: action.payload.response
            };
        default:
            return state;
    }
}