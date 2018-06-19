import * as types from '../actions/action-types';

// const initialState = {
    
// };

export default function regReducer(state = {}, action) {
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
        default:
            return state;
    }
}