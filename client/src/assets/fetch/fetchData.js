import $ from 'jquery';
import { loadState } from '../LocalStorage';

import * as methods from '../../constants/requestMethods';

const buildRequest = options => {
    const { url, method, data, isFormData = false, isStringify = false } = options
    return $.ajax({
        data: isStringify ? JSON.stringify(data) : data,
        accept: 'application/json',
        contentType: isFormData ? false : 'application/json',
        processData: false,
        headers: {"Authorization" : loadState()},
        url,
        method
    });
}

export const getUser = () => {
    return buildRequest({
        url: '/api/data',
        method: methods.POST,
    })
}

export const editUserInformation = data => {
    return buildRequest({
        url: '/api/data',
        method: methods.PUT,
        isFormData: true,
        data
    })
}

export const addUser = user => {
    return buildRequest({
        url: '/api/reg',
        method: methods.POST,
        isFormData: true,
        data: user
    })
}

export const authenticateUser = request => {
    return buildRequest({
        url: '/api/auth',
        method: methods.POST,
        isStringify: true,
        data: request
    })
}