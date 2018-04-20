import axios from 'axios';

export const checkUsername = (username) => {
    return axios({
        method: 'GET',
        url: `${process.env.URL}register/${username}`
    });
};

export const checkEmail = (email) => {
    return axios({
        method: 'POST',
        url: `${process.env.URL}register/emailcheck`,
        data: {
            email
        }
    });
};

export const PostRegister = (body) => {
    return axios({
        method: 'POST',
        url: `${process.env.URL}register`,
        data: body
    });
};
