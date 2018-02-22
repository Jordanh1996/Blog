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

export const DispatchLogOut = () => ({
    type: "LOG_OUT"
})