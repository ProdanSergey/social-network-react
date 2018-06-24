import * as types from '../actions/action-types';

const initialState = {
    response: null
};

export default function regReducer(state = initialState, action) {
    switch(action.type) {
        case types.REG_RESPONSE:
            return { 
                ...state, 
                response: action.payload.response
            };
        default:
            return state;
    }
}