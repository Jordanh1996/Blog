import LogReducer from '../../reducers/log';
import users from '../fixtures/users';

test('should set default state', () => {
    const state = LogReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({});
});

test('should LOG_IN', () => {
    const action = {
        type: 'LOG_IN',
        user: users[0]
    };
    const state = LogReducer({}, action);
    expect(state).toEqual(users[0]);
});

test('should LOG_OUT', () => {
    const action = {
        type: 'LOG_OUT'
    };
    const state = LogReducer(users[0], action);
    expect(state).toEqual({});
});