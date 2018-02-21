import React from 'react';
import {connect} from 'react-redux';
import {startDispatchLogIn, DispatchLogIn} from '../actions/log';

import {Card, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            loadgif: undefined
        }
    }


    onUsernameChange = (e) => {
        const username = e.target.value
        this.setState(() => ({username}))
    }

    onPasswordChange = (e) => {
        const password = e.target.value
        this.setState(() => ({password}))
    }

    onLogin = () => {
        this.setState(() => ({loadgif: 'gif'}))
        this.props.startDispatchLogin(this.state.username, this.state.password).then((res) => {
            this.props.DispatchLogin(res.data.tokens[0].token, this.state.username)
            this.props.history.push('/')
        }).catch(() => {
            this.setState(() => ({loadgif: 'error'}))
        })
    }

    render () {
        return (
            <Card
                style={{
                    'margin': '2rem 1rem',
                    'width': '100%',
                    'height': 'fit-content'
                }}
            >
            <CardText>
                <p className="sign__title">Sign in</p>
                
                <TextField
                    hintText='Username'
                    floatingLabelText='Username'
                    type="text"
                    value={this.state.username}
                    onChange={this.onUsernameChange}
                />

                <br />

                <TextField
                    hintText='Password'
                    floatingLabelText='Password'
                    type="password"
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                />

                <br />

                <RaisedButton label={"Sign in"} primary={true} onClick={this.onLogin} />

                {
                    this.state.loadgif === 'gif' ?
                    <img className='loader__image' src='/images/loader.gif' /> :
                    this.state.loadgif === 'error' ? 
                    <p>invalid details</p> :
                    <p></p>
                }
            </CardText>
            </Card>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startDispatchLogin: (username, password) => dispatch(startDispatchLogIn(username, password)),
        DispatchLogin: (token, username) => dispatch(DispatchLogIn(token, username))
    }
}

export default connect(undefined, mapDispatchToProps)(Login);