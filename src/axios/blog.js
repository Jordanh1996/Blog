import axios from 'axios';

export const getBlogsByTitle = (title) => {
    return axios({
        method: 'get',
        url: `https://blogserver-jordan.herokuapp.com/blog/title/${encodeURIComponent(title)}`,
    })
}

export const getBlogsByUsername = (username) => {
    return axios({
        method: 'get',
        url: `https://blogserver-jordan.herokuapp.com/blog/username/${(username)}`
    })
}

export const getBlogs = (amount, last) => {
    return axios({
        method: "post",
        url: 'https://blogserver-jordan.herokuapp.com/blog/get',
        data: {
            amount,
            last
        }
    })
}

export const getBlogById = (id) => {
    return axios({
        method: "get",
        url: `https://blogserver-jordan.herokuapp.com/blog/${id}`
    })
}

export const AddBlog = (token, title, content) => {
    return axios({
        method: "post",
        url: 'https://blogserver-jordan.herokuapp.com/blog',
        headers: {'x-auth': token},
        data: {
            title,
            content
        }
    })
}

export const EditBlog = (token, id, title, content) => {
    return axios({
        method: "patch",
        url: `https://blogserver-jordan.herokuapp.com/blog/${id}`,
        headers: {'x-auth': token},
        data: {
            title,
            content
        }
    })
}

export const Remove = (id, token) => {
    return axios({
        method: "delete",
        url: `https://blogserver-jordan.herokuapp.com/blog/${id}`,
        headers: {'x-auth': token}
    })
}