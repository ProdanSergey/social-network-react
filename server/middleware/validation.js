import { regex } from '../constants/regex';

const isObject = (target) => {
    if (isEmpty(target)) {
        return false;
    } else {
        return target === Object(target);
    }
}

const isString = (target) => {
    return typeof target === 'string';
}

const isValid = (target) => {
    return regex.test(target);
}

const isEmpty = (target) => {
    const flag = !!Object.keys(target).length;
    return !flag;
}

const Validation = (req, res, next) => {
    const { body, files } = req;
    if(isObject(body)) {
        for(let prop in body) {
            const value = body[prop];
            if (!(isValid(value) && isString(value))) {
                throw new Error(`Invalid value at ${prop}`);
            }
        }
    }
    res.errors = {
        bodyIsEmpty: isEmpty(body),
        filesIsEmpty: isEmpty(files)
    }
    next();
}


export default Validation