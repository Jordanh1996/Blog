import axios from 'axios';

export const login = (username, password) => {
    return axios({
        method: 'POST',
        url: `${process.env.URL}log/in`,
        data: {
            username,
            password
        }
    });
};

export const logout = (token) => {
    return axios({
        method: 'DELETE',
        url: `${process.env.URL}log/out`,
        headers: { 'x-auth': token }
    });
};
