import { DispatchAddBlog, DispatchEditMyBlog, DispatchRemoveBlog, DispatchSetBlogs, DispatchRemoveBlogs } from '../../actions/myblogs';
import blogs from '../fixtures/blogs';

test('checks DispatchAddBlog', () => {
    const action = DispatchAddBlog(blogs[0].title, blogs[0].content, blogs[0].id);
    expect(action).toEqual({
        type: 'ADD_MY_BLOGS',
        blog: {
            title: blogs[0].title,
            content: blogs[0].content,
            id: blogs[0].id
        }
    });
});

test('checks DispatchRemoveBlog', () => {
    const action = DispatchRemoveBlog(blogs[0].id);
    expect(action).toEqual({
        type: 'REMOVE_MY_BLOG',
        id: blogs[0].id
    });
});

test('checks DispatchRemoveBlogs', () => {
    expect(DispatchRemoveBlogs()).toEqual({
        type: 'REMOVE_MY_BLOGS'
    });
});


test('checks DispatchSetBlogs', () => {
    const action = DispatchSetBlogs(blogs);
    expect(action).toEqual({
        type: 'SET_MY_BLOGS',
        blogs
    });
});

test('checks DispatchEditMyBlog', () => {
    const action = DispatchEditMyBlog(blogs[1].id, blogs[1].title, blogs[1].content);
    expect(action).toEqual({
        type: 'EDIT_MY_BLOGS',
        id: blogs[1].id,
        title: blogs[1].title,
        content: blogs[1].content
    });
});
