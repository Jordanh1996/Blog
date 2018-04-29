import { getBlogs } from '../axios/blog';

export const dispatchSetBlogs = (blogs) => ({
    type: 'SET_BLOGS',
    blogs
});

export const dispatchConcatBlogs = (blogs) => ({
    type: 'CONCAT_BLOGS',
    blogs
});

export const dispatchRemoveBlogs = () => ({
    type: 'REMOVE_BLOGS'
});

export const startDispatchSetBlogs = (blogs, username, title) => (dispatch) => {
        if (blogs) {
            return getBlogs(5, blogs[blogs.length - 1].id, username, title).then((res) => {
                dispatch(dispatchConcatBlogs(res.data.resblog));
            });
        }
        return getBlogs(10, undefined, username, title).then((res) => {
            dispatch(dispatchSetBlogs(res.data.resblog));
        });
    };
