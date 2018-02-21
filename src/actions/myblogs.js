export const DispatchSetBlogs = (blogs) => ({
    type: "SET_MY_BLOGS",
    blogs
})

export const DispatchRemoveBlogs = () => ({
    type: "REMOVE_MY_BLOGS"
})

export const DispatchRemoveBlog = (title) => ({
    type: "REMOVE_MY_BLOG",
    title
})

export const DispatchAddBlog = (title, content) => ({
    type: "ADD_MY_BLOGS",
    blog: {
        title,
        content
    }
})

export const DispatchEditMyBlog = (id, title ,content) => ({
    type: "EDIT_MY_BLOGS",
    id,
    title,
    content
})