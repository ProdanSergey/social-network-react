import * as regex from '../constants/regex';

export const validateInput = (field_type, field_value) => {
    switch(field_type) {
        case 'text':
        case 'search': {
            return regex[field_type].test(field_value) && field_value.length < 32;
        }
        case 'email':
        case 'password': {
            return regex[field_type].test(field_value);
        }
        case 'file': {
            const { size, type } = field_value;
            return (size > 4e+4 && size < 5e+6) || type !== 'image/jpeg';
        }
        default: 
            return true;
    }
}