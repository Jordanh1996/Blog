import MyBlogsReducer from '../../reducers/myblogs';
import blogs from '../fixtures/blogs';

test('should set default state', () => {
    const state = MyBlogsReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should SET_MY_BLOGS', () => {
    const action = {
        type: 'SET_MY_BLOGS',
        blogs
    };
    const state = MyBlogsReducer([blogs[0]], action);
});

test('should REMOVE_MY_BLOGS', () => {
    const action = {
        type: 'REMOVE_MY_BLOGS',
    };
    const state = MyBlogsReducer(blogs, action);
    expect(state).toEqual([]);
});

test('should REMOVE_MY_BLOG', () => {
    const action = {
        type: 'REMOVE_MY_BLOG',
        id: blogs[1]._id
    };
    const state = MyBlogsReducer(blogs, action);
    expect(state).toEqual([blogs[0]]);
});

test('should not REMOVE_MY_BLOG with incorrect id', () => {
    const action = {
        type: 'REMOVE_MY_BLOG',
        id: blogs[1]._id
    };
    const state = MyBlogsReducer([blogs[0]], action);
    expect(state).toEqual([blogs[0]]);
});

test('should ADD_MY_BLOGS', () => {
    const action = {
        type: 'ADD_MY_BLOGS',
        blog: blogs[1]
    };
    const state = MyBlogsReducer([blogs[0]], action);
    expect(state).toEqual(blogs);
});

test('should EDIT_MY_BLOGS', () => {
    const action = {
        type: 'EDIT_MY_BLOGS',
        id: blogs[1]._id,
        title: blogs[0].title,
        content: blogs[0].content
    };
    const state = MyBlogsReducer([blogs[1]], action);
    expect(state).toEqual([{...blogs[1], title: blogs[0].title, content: blogs[0].content}]);
});

test('should not EDIT_MY_BLOGS with incorrect id', () => {
    const action = {
        type: 'EDIT_MY_BLOGS',
        id: blogs[0]._id,
        title: blogs[0].title,
        content: blogs[0].content
    };
    const state = MyBlogsReducer([blogs[1]], action);
    expect(state).toEqual([blogs[1]]);
});