import * as types from '../actions/action-types';

const initialState = {
    alert: false,
    body: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case types.SHOW_MESSAGE:
            return { 
                ...state,
                alert: true,
                body: action.payload.body
        };
        case types.HIDE_MESSAGE:
            return { 
                ...state,
                alert: false,
                body: {}
        };
        default : 
            return state;
    }
}