import axios from 'axios';

export const login = (username, password) => {
    return axios({
        method: 'post',
        url: 'https://blogserver-jordan.herokuapp.com/log/in',
        data: {
            username,
            password
        }
    })
}

export const logout = (token) => {
    return axios({
        method: 'delete',
        url: 'https://blogserver-jordan.herokuapp.com/log/out',
        headers: {'x-auth': token}
    })
}