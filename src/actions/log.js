import { login, logout } from '../axios/log';

export const dispatchLogIn = (token, username) => ({
    type: 'LOG_IN',
    user: {
        token,
        username
    }
});

export const dispatchLogOut = () => ({
    type: 'LOG_OUT'
});

export const startDispatchLogIn = (username, password) => {
    return (dispatch) => {
        return login(username, password).then((res) => {
            dispatch(dispatchLogIn(res.data.tokens[0].token, username));
        });
    };
};

export const startDispatchLogOut = () => {
    return (dispatch, getState) => {
        const token = getState().user.token;
        return logout(token).then(() => {
            dispatch(dispatchLogOut());
        });
    };
};
