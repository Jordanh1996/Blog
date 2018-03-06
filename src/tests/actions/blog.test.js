import {DispatchConcatBlogs, DispatchSetBlogs} from '../../actions/blog';
import blogs from '../fixtures/blogs';

test('checks DispatchSetBlogs', () => {
    const action = DispatchSetBlogs(blogs)
    expect(action).toEqual({
        type: 'SET_BLOGS',
        blogs
    })
})

test('checksDispatchConcatBlogs', () => {
    const action = DispatchConcatBlogs(blogs)
    expect(action).toEqual({
        type: 'CONCAT_BLOGS',
        blogs
    })
})