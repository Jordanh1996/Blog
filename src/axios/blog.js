import axios from 'axios';

export const getBlogsByTitle = (title) => {
    return axios({
        method: 'GET',
        url: `${process.env.URL}blog/title/${encodeURIComponent(title)}`,
    });
};

export const getBlogsByUsername = (username) => {
    return axios({
        method: 'GET',
        url: `${process.env.URL}blog/username/${(username)}`
    });
};

export const getBlogs = (amount, last) => {
    return axios({
        method: 'POST',
        url: `${process.env.URL}blog/get`,
        data: {
            amount,
            last
        }
    });
};

export const getBlogById = (id) => {
    return axios({
        method: 'GET',
        url: `${process.env.URL}blog/${id}`
    });
};

export const addBlog = (token, title, content) => {
    return axios({
        method: 'POST',
        url: `${process.env.URL}blog`,
        headers: { 'x-auth': token },
        data: {
            title,
            content
        }
    });
};

export const editBlog = (token, id, title, content) => {
    return axios({
        method: 'PATCH',
        url: `${process.env.URL}blog/${id}`,
        headers: { 'x-auth': token },
        data: {
            title,
            content
        }
    });
};

export const removeBlog = (id, token) => {
    return axios({
        method: 'DELETE',
        url: `${process.env.URL}blog/${id}`,
        headers: { 'x-auth': token }
    });
};
