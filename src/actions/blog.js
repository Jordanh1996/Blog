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
        return new Promise((resolve, reject) => {
            axios({
                method: "post",
                url: 'https://blogserver-jordan.herokuapp.com/blog',
                headers: {'x-auth': token},
                data: {
                    title,
                    content
                }
            }).then(() => {
                resolve()
            }).catch(() => {
                reject()
            })
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