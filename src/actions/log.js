import axios from 'axios';


export const DispatchLogIn = (token, username) => ({
    type: "LOG_IN",
    user: {
        token,
        username
    }
})

export const startDispatchLogIn = (username, password) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: 'https://blogserver-jordan.herokuapp.com/login',
                data: {
                    username,
                    password
                }
            }).then((res) => {
                dispatch(DispatchLogIn(res.data.tokens[0].token, res.data.username))
                resolve()
            }).catch(() => {
                reject()
            })
        })

    }
}

export const DispatchLogOut = () => ({
    type: "LOG_OUT"
})

export const startDispatchLogOut = (token) => {
    return (dispatch) => {
        axios({
            method: 'delete',
            url: 'https://blogserver-jordan.herokuapp.com/logout',
            headers: {'x-auth': token}
        }).then(() => {
            dispatch(DispatchLogOut())
        })
    }
}