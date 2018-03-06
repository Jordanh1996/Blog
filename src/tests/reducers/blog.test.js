import BlogReducer from '../../reducers/blog';
import blogs from '../fixtures/blogs';

test('should set default state', () => {
    const state = BlogReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should SET_BLOGS', () => {
    const action = {
        type: 'SET_BLOGS',
        blogs
    };
    const state = BlogReducer([blogs[0]], action);
    expect(state).toEqual(blogs);
});

test('should CONCAT_BLOGS', () => {
    const action = {
        type: 'CONCAT_BLOGS',
        blogs: [blogs[1]]
    };
    const state = BlogReducer([blogs[0]], action);
    expect(state).toEqual(blogs);
})