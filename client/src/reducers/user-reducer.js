import * as types from '../actions/action-types';

const initialState = {
  user: {}
};

const userReducer = function(state = initialState, action) {
    switch(action.type) {
        case types.ADD_USER:
            return { ...state, user: action.user };
        case types.GET_USER:
            return { ...state, user: action.user };
    }
    return state;
}

export default userReducer;