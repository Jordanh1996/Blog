
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
