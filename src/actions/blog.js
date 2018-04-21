import { getBlogs } from '../axios/blog';

export const dispatchSetBlogs = (blogs) => ({
    type: 'SET_BLOGS',
    blogs
});

export const dispatchConcatBlogs = (blogs) => ({
    type: 'CONCAT_BLOGS',
    blogs
});

//thunk

export const startDispatchSetBlogs = (blogs) => {
    return (dispatch) => {
        if (blogs) {
            return getBlogs(5, blogs[blogs.length - 1]._id).then((res) => {
                dispatch(dispatchConcatBlogs(res.data.resblog));
            });
        }
        return getBlogs(10).then((res) => {
            dispatch(dispatchSetBlogs(res.data.resblog));
        });
    };
};
