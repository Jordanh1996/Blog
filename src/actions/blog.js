import {getBlogs, getBlogById, AddBlog, EditBlog} from '../axios/blog';

export const DispatchAddBlog = (title, content) => ({
    type: "ADD_BLOG",
    blog: {
        title,
        content
    }
})

export const startDispatchAddBlog = (token, title, content) => {
    return (dispatch) => {
        return AddBlog(token, title, content)
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

export const DispatchConcatBlogs = (blogs) => ({
    type: "CONCAT_BLOGS",
    blogs
})

export const startDispatchSetBlogs = (amount, last) => {
    return (dispatch) => {
        return getBlogs(amount, last)
    }
}

export const startDispatchGetBlog = (id) => {
    return (dispatch) => {
        return getBlogById(id)
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
        return EditBlog(token, id, title, content)
    }
}
