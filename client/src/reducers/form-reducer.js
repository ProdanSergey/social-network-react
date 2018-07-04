import * as types from '../actions/action-types';

export default function formReducer(state = { form: {}, switchers: {} }, action) {
    switch(action.type) {
        case types.STORE_FIELD_DATA:
            return { 
                ...state,
                form: Object.assign({}, state.form, action.payload)
        };
        case types.SWITCH_FIELD_MODE:
            return { 
                ...state,
                switchers: action.payload
        };
        case types.CLEAR_FORM_DATA:
            return { 
                ...state,
                form: {},
                switchers: {}
        };
        default : 
            return state;
    }
}