import * as types from '../actions/action-types';

export default function formReducer(state = { form: {} }, action) {
    switch(action.type) {
        case types.STORE_FIELD_DATA:
            const {name, value, valid} = action.payload
            return { 
                ...state,
                form: {...state.form, [name]:{value,valid}}
        };
        case types.CLEAR_FORM_DATA:
            return { 
                ...state,
                form: {}
        };
        default : 
            return state;
    }
}