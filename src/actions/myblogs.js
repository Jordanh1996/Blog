import {
    addBlog,
    editBlog,
    getBlogsByUsername,
    removeBlog
} from '../axios/blog';

import {
    getSignedUrl,
    postFile,
    deleteFile
} from '../axios/upload';

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

export const dispatchAddBlog = (title, content, image, id) => ({
    type: 'ADD_MY_BLOGS',
    blog: {
        title,
        content,
        image,
        id
    }
});

export const dispatchEditBlog = (id, title, content, image) => ({
    type: 'EDIT_MY_BLOGS',
    id,
    title,
    content,
    image
});

export const startDispatchAddBlog = (title, content, image, imageChanged) => (dispatch, getState) => {
    const token = getState().user.token;
    if (!imageChanged && imageChanged !== null) {
        return addBlog(token, title, content, image).then((res) => {
            dispatch(dispatchAddBlog(title, content, image, res.data.id));
        });
    }
    return getSignedUrl(token).then((res) => postFile(res.data.url, image).then(() => addBlog(token, title, content, res.data.key).then((res) => {
        dispatch(dispatchAddBlog(title, content, image, res.data.id));
    })));
};

export const startDispatchEditBlog = (id, title, content, image, imageChanged) => (dispatch, getState) => {
    const token = getState().user.token;
    if (!imageChanged) {
        return editBlog(token, id, title, content, image).then(() => {
            dispatch(dispatchEditBlog(id, title, content, image));
        });
    }
    return getSignedUrl(token).then((res) => postFile(res.data.url, image).then(() => {
        deleteFile(token, imageChanged);
        return editBlog(token, id, title, content, res.data.key).then(() => {
            dispatch(dispatchEditBlog(id, title, content, res.data.key));
        });
    }));
};

export const startDispatchSetBlogs = () => (dispatch, getState) => {
    const token = getState().user.token;
    return getBlogsByUsername(token).then((res) => {
        dispatch(dispatchSetBlogs(res.data.resblog));
    });
};

export const startDispatchRemoveBlog = (id, image) => (dispatch, getState) => {
    const token = getState().user.token;
    if (image) {
        return deleteFile(token, image).then(() => removeBlog(id, token).then(() => {
            dispatch(dispatchRemoveBlog(id));
        }));
    }
    return removeBlog(id, token).then(() => {
        dispatch(dispatchRemoveBlog(id));
    });
};
