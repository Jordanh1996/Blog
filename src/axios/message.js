import axios from 'axios';

export const addMessage = (token, content, blogId) => axios({
    method: 'POST',
    url: `${process.env.URL}message`,
    data: {
        content,
        blogId
    },
    headers: {
        'x-auth': token
    }
});

export const removeMessage = (token, messageId) => axios({
    method: 'DELETE',
    url: `${process.env.URL}message/remove/${messageId}`,
    headers: {
        'x-auth': token
    }
});

export const editMessage = (token, messageId, content) => axios({
    method: 'PATCH',
    url: `${process.env.URL}message/update/${messageId}`,
    data: {
        content
    },
    headers: {
        'x-auth': token
    }
});

export const getMessagesByBlogId = (blogId) => axios({
    method: 'GET',
    url: `${process.env.URL}message/blog/${blogId}`
});

export const getMessagesByUsername = (username) => axios({
    method: 'GET',
    url: `${process.env.URL}message/username/${username}`
});
