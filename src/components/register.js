import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {startDispatchLogIn} from '../actions/log';
import validator from 'validator';
import { setTimeout, clearTimeout } from 'timers';
 
class Register extends React.Component {
    
    state = {
        username: '',
        userint: undefined,
        validusername: false,
        password: '',
        validpassword: false,
        confirmPassword: '',
        validConfirmPassword: false,
        email: '',
        emailint: undefined,
        validEmail: false,
        submit: false,
        error: ''
    }

    componentWillMount() {
        if (this.props.isOnline) {
            this.props.history.push('/')
        }
    }

    onUserChange = (e) => {
        clearTimeout(this.state.userint)
        const username = e.target.value;
        this.setState(() => ({username}))
        if (username.length >= 6) {
            this.setState(() => ({validusername: 'pending'}))
        } else {
            this.setState(() => ({validusername: false}))
        }
        this.setState(() => ({userint: setTimeout(() => {
            if (this.state.username.length >= 6) {
                axios({
                    method: 'GET',
                    url: `https://blogserver-jordan.herokuapp.com/usercheck/${this.state.username}`
                }).then((res) => {
                    if (res.data) {
                        return this.setState(() => ({validusername: true}))
                    }
                    this.setState(() => ({validusername: false}))
                }).catch((e) => {
                    console.log(e)
                })
            }
        }, 500)}))
        

    }

    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({password}))
        if (password.length >= 6) {
            return this.setState(() => ({validpassword: true}))
        }
        this.setState(() => ({validpassword: false}))
    }

    onConfirmPasswordChange = (e) => {
        const confirmPassword = e.target.value;
        this.setState(() => ({confirmPassword}))
        if (confirmPassword === this.state.password) {
            this.setState(() => ({validConfirmPassword: true}))
        } else {
            this.setState(() => ({validConfirmPassword: false}))
        }
    }

    onEmailChange = (e) => {
        clearTimeout(this.state.emailint)
        const email = e.target.value;
        this.setState(() => ({email}))
        if (validator.isEmail(email)) {
            this.setState(() => ({validEmail: 'pending'}))
        } else {
            this.setState(() => ({validEmail: false}))
        }
        this.setState(() => ({emailint: setTimeout(() => {
            if (validator.isEmail(email)) {
                axios({
                    method: 'POST',
                    url: 'https://blogserver-jordan.herokuapp.com/emailcheck',
                    data: {
                        email
                    }
                }).then((res) => {
                    if (res.data) {
                        return this.setState(() => ({validEmail: true}))
                    }
                    this.setState(() => ({validEmail: false}))
                }).catch((e) => {
                    console.log(e)
                })
            }
        }, 500)}))
    }

    onRegister = () => {
        this.setState(() => ({submit: true}))
        const JSONbody = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }
        axios({
            method: 'POST',
            url: 'https://blogserver-jordan.herokuapp.com/register',
            data: JSONbody
        }).then((res) => {
            this.props.dispatchLogIn(this.state.username, this.state.password).then(() => {
                this.props.history.push('/')
            })
        }).catch((e) => {
            this.setState(() => ({error: true}))
        })
    }

    render () {
        return (
            <div>
                <p>Username : </p>
                <input type="text"
                value={this.state.username}
                onChange={this.onUserChange}
                autoFocus
                />
                {
                    this.state.username.length < 6 ?
                    <p>username must include at least 6 characters</p> :
                    <p></p>
                }
                {
                    this.state.validusername === 'pending' ?
                    <img className='image-register' src='/images/loader.gif' /> :
                    this.state.validusername ? 
                    <img className='image-register' src='/images/check.png' /> :
                    <img className='image-register' src='/images/xmark.png' />
                }

                <p>Password : </p>
                <input type="password"
                value={this.state.password}
                onChange={this.onPasswordChange}
                />
                {
                    this.state.validpassword ?
                    <img className='image-register' src="/images/check.png" /> :
                    <img className='image-register' src="/images/xmark.png" />
                }

                <p>Confirm Password: </p>
                <input type="password"
                value={this.state.confirmPassword}
                onChange={this.onConfirmPasswordChange}
                />
                {
                    this.state.validConfirmPassword ?
                    <img className='image-register' src="/images/check.png" /> :
                    <img className='image-register' src="/images/xmark.png" />
                }

                <p>Email : </p>
                <input type="text"
                value={this.state.email}
                onChange={this.onEmailChange}
                />
                {
                    validator.isEmail(this.state.email) ?
                    <p></p> :
                    <p>Enter a valid email</p>
                }
                {
                    this.state.validEmail === 'pending' ?
                    <img className='image-register' src='/images/loader.gif' /> :
                    this.state.validEmail ? 
                    <img className='image-register' src='/images/check.png' /> :
                    <img className='image-register' src='/images/xmark.png' />
                }

                <button 
                onClick={this.onRegister}
                disabled={!(this.state.validEmail && this.state.validusername && this.state.validpassword && 
                    this.state.validConfirmPassword && this.state.validEmail !== 'pending' && this.state.validusername !== 'pending')}
                >
                    Submit
                </button>
                {
                    (<img className='image-register' src='/images/loader.gif' /> && this.state.submit)
                }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchLogIn: (username, password) => dispatch(startDispatchLogIn(username, password))
    }
}

const mapStateToProps = (state) => {
    return {
        isOnline: state.user.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
