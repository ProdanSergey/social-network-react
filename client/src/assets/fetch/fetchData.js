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
        method: methods.GET,
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

export const addUser = data => {
    return buildRequest({
        url: '/api/reg',
        method: methods.POST,
        isFormData: true,
        data
    })
}

export const authenticateUser = data => {
    return buildRequest({
        url: '/api/auth',
        method: methods.POST,
        isStringify: true,
        data
    })
}

export const searchUsers = data => {
    return buildRequest({
        url: '/api/search',
        method: methods.POST,
        isStringify: true,
        data
    })
}

export const addFriend = data => {
    return buildRequest({
        url: '/api/friends',
        method: methods.PUT,
        isStringify: true,
        data
    })
}

export const removeFriend = data => {
    return buildRequest({
        url: '/api/friends',
        method: methods.DELETE,
        isStringify: true,
        data
    })
}

export const getFriends = () => {
    return buildRequest({
        url: '/api/friends',
        method: methods.GET,
    })
}