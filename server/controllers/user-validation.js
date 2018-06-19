// Regex import
import * as regex from '../constants/regex';

export function validateEmail(email) {
    return regex.email.test(email.toLowerCase());
}

export function validateUser(field) {
    return typeof field === 'string' ? regex.text.test(field) : false;
}