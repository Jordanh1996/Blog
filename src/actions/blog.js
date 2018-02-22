import {getBlogs, getBlogById, AddBlog, EditBlog} from '../axios/blog';

export const DispatchAddBlog = (title, content) => ({
    type: "ADD_BLOG",
    blog: {
        title,
        content
    }
})

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

export const DispatchEditBlog = (id, title, content) => ({
    type: "EDIT_BLOG",
    id,
    title,
    content
})