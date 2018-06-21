import * as regex from '../constants/regex';

export const Validation = (field_type, field_value) => {
    switch(field_type) {
        case 'text': {
            return regex[field_type].test(field_value) && field_value.length < 32;
        }
        case 'email': {
            return regex[field_type].test(field_value);
        }
        case 'password': {
            return regex[field_type].test(field_value);
        }
        default: 
            return true;
    }
}