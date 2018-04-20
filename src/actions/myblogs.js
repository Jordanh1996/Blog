export const DispatchSetBlogs = (blogs) => ({
    type: 'SET_MY_BLOGS',
    blogs
});

export const DispatchRemoveBlogs = () => ({
    type: 'REMOVE_MY_BLOGS'
});

export const DispatchRemoveBlog = (id) => ({
    type: 'REMOVE_MY_BLOG',
    id
});

export const DispatchAddBlog = (title, content, _id) => ({
    type: 'ADD_MY_BLOGS',
    blog: {
        title,
        content,
        _id
    }
});

export const DispatchEditMyBlog = (id, title, content) => ({
    type: 'EDIT_MY_BLOGS',
    id,
    title,
    content
});
