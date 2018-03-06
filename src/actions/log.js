
export const DispatchLogIn = (token, username) => ({
    type: "LOG_IN",
    user: {
        token,
        username
    }
})

export const DispatchLogOut = () => ({
    type: "LOG_OUT"
})