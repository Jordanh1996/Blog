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
        clearTimeout(this.state.userint);
        const username = e.target.value;
        this.setState(() => ({ username }));
        if (username.length >= 6) {
            this.setState(() => ({ validusername: 'pending' }));
        } else {
            this.setState(() => ({ validusername: false }));
        }
        this.setState(() => ({ userint: setTimeout(() => {
            if (this.state.username.length >= 6) {
                checkUsername(this.state.username)
                .then((res) => {
                    if (res.data) {
                        return this.setState(() => ({ validusername: true }));
                    }
                    this.setState(() => ({ validusername: false }));
                }).catch((err) => {
                    console.log(err);
                });
            }
        }, 500)
    }));
    }

    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ password }));
        if (password.length >= 6) {
            return this.setState(() => ({ validpassword: true }));
        }
        this.setState(() => ({ validpassword: false }));
    }

    onConfirmPasswordChange = (e) => {
        const confirmPassword = e.target.value;
        this.setState(() => ({ confirmPassword }));
        if (confirmPassword === this.state.password) {
            this.setState(() => ({ validConfirmPassword: true }));
        } else {
            this.setState(() => ({ validConfirmPassword: false }));
        }
    }

    onEmailChange = (e) => {
        clearTimeout(this.state.emailint);
        const email = e.target.value;
        this.setState(() => ({ email }));
        if (validator.isEmail(email)) {
            this.setState(() => ({ validEmail: 'pending' }));
        } else {
            this.setState(() => ({ validEmail: false }));
        }
        this.setState(() => ({ emailint: setTimeout(() => {
            if (validator.isEmail(email)) {
                checkEmail(email)
                .then((res) => {
                    if (res.data) {
                        return this.setState(() => ({ validEmail: true }));
                    }
                    this.setState(() => ({ validEmail: false }));
                }).catch((err) => {
                    console.log(err);
                });
            }
        }, 500)
    }));
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
                    errorText={!this.state.validusername && this.state.username.length > 5 ? 
                        'This user name is alredy taken' : 
                        ''}
                />
                {
                    this.state.username === '' ?
                    '' :
                    this.state.validusername === 'pending' ?
                    <img className='image-register' src='/images/loader.gif' /> :
                    this.state.validusername ? 
                    <img className='image-register' src='/images/check.png' /> :
                    <img className='image-register' src='/images/xmark.png' />
                }
                {
                    <div className="register__tip">Username must include at least 6 characters</div>
                }

                <br />
                <TextField
                    hintText='Password'
                    floatingLabelText='Password'
                    type="password"
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                />
                {   
                    this.state.password === '' ?
                    '' :
                    this.state.validpassword ?
                    <img className='image-register' src="/images/check.png" /> :
                    <img className='image-register' src="/images/xmark.png" />
                }
                {
                    <div className="register__tip">Password must include at least 6 characters</div>
                }

                <br />
                <TextField
                    hintText='Confirm Password'
                    floatingLabelText="Confirm Password"
                    type="password"
                    value={this.state.confirmPassword}
                    onChange={this.onConfirmPasswordChange}
                />
                {
                    this.state.confirmPassword === '' ?
                    '' :
                    this.state.validConfirmPassword ?
                    <img className='image-register' src="/images/check.png" /> :
                    <img className='image-register' src="/images/xmark.png" />
                }
                {
                    <div className="register__tip">Re-enter Password</div>
                }

                <br />
                <TextField
                    hintText="Email"
                    floatingLabelText="Email"
                    type="text"
                    value={this.state.email}
                    onChange={this.onEmailChange}
                    errorText={!this.state.validEmail && validator.isEmail(this.state.email) ? 
                        'This email is alredy taken' : 
                        ''}
                />
                {
                    this.state.email === '' ?
                    <p></p> :
                    this.state.validEmail === 'pending' ?
                    <img className='image-register' src='/images/loader.gif' /> :
                    this.state.validEmail ? 
                    <img className='image-register' src='/images/check.png' /> :
                    <img className='image-register' src='/images/xmark.png' />
                }
                {
                    <div className="register__tip">Enter a valid email</div>
                }

                <br />
                <RaisedButton
                onClick={this.onRegister}
                disabled={!(this.state.validEmail && this.state.validusername && this.state.validpassword && 
                    this.state.validConfirmPassword && this.state.validEmail !== 'pending' && this.state.validusername !== 'pending')}
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
