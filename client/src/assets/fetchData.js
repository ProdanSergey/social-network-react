import $ from 'jquery';

export const getUser = token => {
    return $.ajax({
        url: '/api/data',
        method: 'post',
        accept: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify(token)
    });
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