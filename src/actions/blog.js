
export const DispatchSetBlogs = (blogs) => ({
    type: 'SET_BLOGS',
    blogs
});

export const DispatchConcatBlogs = (blogs) => ({
    type: 'CONCAT_BLOGS',
    blogs
});

export const DispatchEditBlog = (id, title ,content) => ({
    type: 'EDIT_BLOG',
    id,
    title,
    content
});
