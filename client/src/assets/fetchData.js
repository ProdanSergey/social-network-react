import $ from 'jquery';
import { loadState } from './LocalStorage'

export const getUser = token => {
    return $.ajax({
        url: '/api/data',
        method: 'post',
        accept: 'application/json',
        contentType: 'application/json',
        headers: {'x-access-token': loadState()}
    });
}

export const editUserInformation = data => {
    return $.ajax({
        url: '/api/data',
        method: 'put',
        accept: 'application/json',
        data: data,
        contentType: false,
        processData: false,
        headers: {'x-access-token': loadState()},
    })
}

export const addUser = user => {
    return $.ajax({
        url: '/api/reg',
        method: 'post',
        accept: 'application/json',
        data: user,
        contentType: false,
        processData: false,
    });
}

export const authenticateUser = request => {
    return $.ajax({
        url: '/api/auth',
        method: 'post',
        accept: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify(request),
    });
}