import $ from 'jquery';

export const getUser = token => {
    return $.ajax({
        url: '/api/data',
        method: 'post',
        accept: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify(token)
    })
}



