import axios from 'axios';

export const getBlogs = (amount, last, username, title) => axios({
        method: 'POST',
        url: `${process.env.URL}blog/get`,
        data: {
            amount,
            last,
            username,
            title
        }
    });

export const getBlogsByUsername = (token) => axios({
        method: 'GET',
        url: `${process.env.URL}blog/username`,
        headers: { 'x-auth': token }
    });

export const getBlogById = (id) => axios({
        method: 'GET',
        url: `${process.env.URL}blog/${id}`
    });

export const addBlog = (token, title, content, image) => axios({
        method: 'POST',
        url: `${process.env.URL}blog`,
        headers: { 'x-auth': token },
        data: {
            title,
            content,
            image
        }
    });

export const editBlog = (token, id, title, content, image) => axios({
        method: 'PATCH',
        url: `${process.env.URL}blog/${id}`,
        headers: { 'x-auth': token },
        data: {
            title,
            content,
            image
        }
    });

export const removeBlog = (id, token) => axios({
        method: 'DELETE',
        url: `${process.env.URL}blog/${id}`,
        headers: { 'x-auth': token }
    });
