import axios from 'axios';

export const checkUsername = (username) => {
    return axios({
        method: 'GET',
        url: `https://blogserver-jordan.herokuapp.com/register/${username}`
    })
}

export const checkEmail = (email) => {
    return axios({
        method: 'POST',
        url: 'https://blogserver-jordan.herokuapp.com/register/emailcheck',
        data: {
            email
        }
    })
}

export const PostRegister = (body) => {
    return axios({
        method: 'POST',
        url: 'https://blogserver-jordan.herokuapp.com/register',
        data: body
    })
}