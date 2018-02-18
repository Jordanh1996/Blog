import axios from 'axios';
import {persistor} from '../app';
import {Login, Logout} from '../axios/log';


export const DispatchLogIn = (token, username) => ({
    type: "LOG_IN",
    user: {
        token,
        username
    }
})

export const startDispatchLogIn = (username, password) => {
    return (dispatch) => {
        return Login(username, password)
    }
}

export const DispatchLogOut = () => ({
    type: "LOG_OUT"
})

export const startDispatchLogOut = (token) => {
    return (dispatch) => {
        return Logout(token)
    }
}