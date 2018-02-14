import uuid from 'uuid';
import axios from 'axios';

export const DispatchAddBlog = (title, content) => ({
    type: "ADD_BLOG",
    blog: {
        title,
        content,
        id: uuid()
    }
})

export const startDispatchAddBlog = (token, title, content) => {
    return (dispatch) => {
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
}

export const DispatchRemoveBlog = (title) => ({
    type: "REMOVE_BLOG",
    title
})

export const DispatchSetBlogs = (blogs) => ({
    type: "SET_BLOGS",
    blogs
})

export const startDispatchSetBlogs = () => {
    return (dispatch) => {
        axios({
            method: "GET",
            url: 'https://blogserver-jordan.herokuapp.com/blog'
        }).then((res) => {
            dispatch(DispatchSetBlogs(res.data.resblog))
        })
    }
}

export const startDispatchGetBlog = (id) => {
    return (dispatch) => {
        axios({
            method: "get",
            url: `https://blogserver-jordan.herokuapp.com/blog/${id}`
        }).then((res) => {
            dispatch(DispatchSetBlogs([res.data.resblog]))
        })
    }
}

export const DispatchEditBlog = (id, title, content) => ({
    type: "EDIT_BLOG",
    id,
    title,
    content
})

export const startDispatchEditBlog = (token, id, title, content) => {
    return (dispatch) => {
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
}
