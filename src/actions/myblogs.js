import { 
    addBlog, 
    editBlog, 
    getBlogsByUsername,
    removeBlog
 } from '../axios/blog';

export const dispatchSetBlogs = (blogs) => ({
    type: 'SET_MY_BLOGS',
    blogs
});

export const dispatchRemoveBlogs = () => ({
    type: 'REMOVE_MY_BLOGS'
});

export const dispatchRemoveBlog = (id) => ({
    type: 'REMOVE_MY_BLOG',
    id
});

export const dispatchAddBlog = (title, content, _id) => ({
    type: 'ADD_MY_BLOGS',
    blog: {
        title,
        content,
        _id
    }
});

export const dispatchEditBlog = (id, title, content) => ({
    type: 'EDIT_MY_BLOGS',
    id,
    title,
    content
});

export const startDispatchAddBlog = (title, content) => {
    return (dispatch, getState) => {
        const token = getState().user.token;
        return addBlog(token, title, content).then((res) => {
            dispatch(dispatchAddBlog(title, content, res.data._id));
        });
    };
};

export const startDispatchEditBlog = (id, title, content) => {
    return (dispatch, getState) => {
        const token = getState().user.token;
        return editBlog(token, id, title, content).then(() => {
            dispatch(dispatchEditBlog(id, title, content));
        });
    };
};

export const startDispatchSetBlogs = () => {
    return (dispatch, getState) => {
        const username = getState().user.username;
        return getBlogsByUsername(username).then((res) => {
            dispatch(dispatchSetBlogs(res.data.resblog));
        });
    };
};

export const startDispatchRemoveBlog = (id) => {
    return (dispatch, getState) => {
        const token = getState().user.token;
        return removeBlog(id, token).then(() => {
            dispatch(dispatchRemoveBlog(id));
        });
    };
};
