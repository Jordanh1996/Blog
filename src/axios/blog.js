import axios from 'axios';

export const getBlogs = (amount, last, username, title) => {
    return axios({
        method: 'POST',
        url: `${process.env.URL}blog/get`,
        data: {
            amount,
            last,
            username,
            title
        }
    });
};

export const getBlogsByUsername = (username, token) => {
    return axios({
        method: 'GET',
        url: `${process.env.URL}blog/username/${username}`,
        headers: { 'x-auth': token }
    });
};

export const getBlogById = (id) => {
    return axios({
        method: 'GET',
        url: `${process.env.URL}blog/${id}`
    });
};

export const addBlog = (token, title, content, image) => {
    return axios({
        method: 'POST',
        url: `${process.env.URL}blog`,
        headers: { 'x-auth': token },
        data: {
            title,
            content,
            image
        }
    });
};

export const editBlog = (token, id, title, content, image) => {
    return axios({
        method: 'PATCH',
        url: `${process.env.URL}blog/${id}`,
        headers: { 'x-auth': token },
        data: {
            title,
            content,
            image
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
