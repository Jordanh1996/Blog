import React from 'react';
import { connect } from 'react-redux';
import { checkUsername, checkEmail, postRegister } from '../axios/register';
import { startDispatchLogIn } from '../actions/log';
import validator from 'validator';
import { setTimeout, clearTimeout } from 'timers';

import { Card, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
 
class Register extends React.Component {
    
    state = {
        username: '',
        userint: undefined,
        validusername: false,
        password: '',
        passwordint: undefined,
        validpassword: false,
        confirmPassword: '',
        confirmPasswordint: undefined,
        validConfirmPassword: false,
        email: '',
        emailint: undefined,
        validEmail: false,
        submit: false,
        error: ''
    }

    componentWillMount() {
        if (this.props.isOnline) {
            this.props.history.push('/');
        }
    }

    onUserChange = (e) => {
        const username = e.target.value;
        if (!username || username.match(/^[a-z0-9]*$/i)) {
            clearTimeout(this.state.userint);
            this.setState(() => ({ 
                username,
                validusername: undefined,
                userint: setTimeout(() => {
                if (username.length < 6) {
                    return this.setState(() => ({ 
                        validusername: 'Username must include at least 6 characters' 
                    }));
                }
                checkUsername(username).then((res) => {
                    if (res.data.taken) {
                        return this.setState(() => ({ 
                            validusername: 'This username is alredy taken' 
                        }));
                    }
                    this.setState(() => ({ validusername: '' }));
                });
            }, 600) }));
        }
    }

    onPasswordChange = (e) => {
        clearTimeout(this.state.passwordint);
        const password = e.target.value;
        this.setState(() => ({ 
            password,
            validpassword: undefined,
            passwordint: setTimeout(() => {
                if (password.length < 6) {
                    return this.setState(() => ({
                        validpassword: 'Password must include at least 6 characters'
                    }));
                }
                this.setState(() => ({ validpassword: '' }));
            }, 600)
         }));
    }

    onConfirmPasswordChange = (e) => {
        clearTimeout(this.state.confirmPasswordint);
        const confirmPassword = e.target.value;
        this.setState(() => ({ 
            confirmPassword,
            validConfirmPassword: undefined,
            confirmPasswordint: setTimeout(() => {
                if (confirmPassword !== this.state.password) {
                    return this.setState(() => ({
                        validConfirmPassword: 'Passwords do not match'
                    }));
                }
                this.setState(() => ({ validConfirmPassword: '' }));
            }, 600)
         }));
    }

    onEmailChange = (e) => {
        const email = e.target.value;
        clearTimeout(this.state.emailint);
        this.setState(() => ({ 
            email,
            validEmail: undefined,
            emailint: setTimeout(() => {
            if (!validator.isEmail(email)) {
                return this.setState(() => ({ 
                    validEmail: 'Please enter a valid email' 
                }));
            }
            checkEmail(email).then((res) => {
                if (res.data.taken) {
                    return this.setState(() => ({ 
                        validEmail: 'This email is alredy taken' 
                    }));
                }
                this.setState(() => ({ validEmail: '' }));
            });
        }, 600) }));
    }

    onRegister = () => {
        this.setState(() => ({ submit: true }));
        const JSONbody = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        };
        postRegister(JSONbody).then(() => {
            this.props.login(this.state.username, this.state.password).then(() => {
                this.props.history.push('/');
            });
        }).catch(() => {
            this.setState(() => ({ error: true, submit: false }));
        });
    }

    render() {
        return (
            <Card
                style={{
                    margin: '2rem 1rem',
                    width: '100%',
                    height: 'fit-content'
                }}
            >
            <CardText>
                <p className="sign__title">Registration</p>
                
                <TextField
                    hintText="Username"
                    floatingLabelText="Username"
                    type="text"
                    value={this.state.username}
                    onChange={this.onUserChange}
                    errorText={this.state.validusername}
                />
                {
                    this.state.username === '' ?
                    null :
                    this.state.validusername === undefined ?
                    <img className='image-register' src='/images/loader.gif' /> :
                    !this.state.validusername ? 
                    <img className='image-register' src='/images/check.png' /> :
                    <img className='image-register' src='/images/xmark.png' />
                }

                <br />
                <TextField
                    hintText='Password'
                    floatingLabelText='Password'
                    type="password"
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                    errorText={this.state.validpassword}
                />
                {
                    this.state.password === '' ?
                    null :
                    this.state.validpassword === undefined ?
                    <img className='image-register' src='/images/loader.gif' /> :
                    !this.state.validpassword ? 
                    <img className='image-register' src='/images/check.png' /> :
                    <img className='image-register' src='/images/xmark.png' />
                }

                <br />
                <TextField
                    hintText='Confirm Password'
                    floatingLabelText="Confirm Password"
                    type="password"
                    value={this.state.confirmPassword}
                    onChange={this.onConfirmPasswordChange}
                    errorText={this.state.validConfirmPassword}
                />
                {
                    this.state.confirmPassword === '' ?
                    null :
                    this.state.validConfirmPassword === undefined ?
                    <img className='image-register' src='/images/loader.gif' /> :
                    !this.state.validConfirmPassword ? 
                    <img className='image-register' src='/images/check.png' /> :
                    <img className='image-register' src='/images/xmark.png' />
                }
                <br />
                <TextField
                    hintText="Email"
                    floatingLabelText="Email"
                    type="text"
                    value={this.state.email}
                    onChange={this.onEmailChange}
                    errorText={this.state.validEmail}
                />
                {
                    this.state.email === '' ?
                    null :
                    this.state.validEmail === undefined ?
                    <img className='image-register' src='/images/loader.gif' /> :
                    !this.state.validEmail ? 
                    <img className='image-register' src='/images/check.png' /> :
                    <img className='image-register' src='/images/xmark.png' />
                }

                <br />
                <RaisedButton
                onClick={this.onRegister}
                disabled={
                    !(this.state.validusername === '' && 
                    this.state.validpassword === '' &&
                    this.state.validConfirmPassword === '' &&
                    this.state.validEmail === ''
                ) || this.state.submit}
                primary
                label={'Submit'}
                />
                {   
                    this.state.submit ?
                    <img className='image-register' src='/images/loader.gif' /> :
                    ''
                }
            </CardText>
            </Card>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(startDispatchLogIn(username, password))
    };
};

const mapStateToProps = (state) => {
    return {
        isOnline: state.user.token
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
