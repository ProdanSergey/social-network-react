import * as types from '../actions/action-types';

const initialState = {
    regIsSuccess: false,
    alertText: {}
};

export default function regReducer(state = initialState, action) {
    switch(action.type) {
        case types.REG_SUCCESS:
            return { 
                ...state, 
                regIsSuccess: true
            };
        case types.REG_FAILED:
            return { 
                ...state, 
                regIsSuccess: false
             };
        case types.REG_SUCCESS_TEXT:
            return { 
                ...state, 
                alertText: action.payload.alertText
            };
        default:
            return state;
    }
}