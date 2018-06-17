import * as types from '../actions/action-types';

const initialState = {
    userIsRegistered: false
};

const regReducer = function(state = initialState, action) {
    switch(action.type) {
        case types.REG_SUCCESS:
            return { ...state, user: action.user };
        case types.REG_FAILED:
            return { ...state, user: action.user };
    }
    return state;
}

export default regReducer;