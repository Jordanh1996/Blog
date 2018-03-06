import {DispatchLogIn, DispatchLogOut} from '../../actions/log';
import users from '../fixtures/users';

test('check DispatchLogIn', () => {
    const action = DispatchLogIn(users[0].token, users[0].username)
    expect(action).toEqual({
        type: 'LOG_IN',
        user: {
            token: users[0].token,
            username: users[0].username
        }
    })
})

test('check DispatchLogOut', () => {
    const action = DispatchLogOut()
    expect(action).toEqual({
        type: 'LOG_OUT'
    })
})