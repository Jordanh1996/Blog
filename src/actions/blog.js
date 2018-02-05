import uuid from 'uuid';

export const DispatchAddBlog = (title, content) => ({
    type: "ADD_BLOG",
    blog: {
        title,
        content,
        id: uuid()
    }
})

export const DispatchRemoveBlog = (title) => ({
    type: "REMOVE_BLOG",
    title
})