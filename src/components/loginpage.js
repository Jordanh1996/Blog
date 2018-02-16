import React from 'react';
import {connect} from 'react-redux';
import {startDispatchLogIn, DispatchLogIn} from '../actions/log';


class LoginPage extends React.Component {

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

    getstate = () => {
        console.log(this.props.getstate)
    }

    render () {
        return (
            <div>
                <p>Username: </p>
                <input
                    type='text'
                    autoFocus
                    value={this.state.username}
                    onChange={this.onUsernameChange}
                />

                <p>Password: </p>
                <input
                    type='password'
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                />

                <button onClick={this.onLogin}>
                    Log in
                </button>

                <button onClick={this.getstate}> get state </button>

                {
                    this.state.loadgif === 'gif' ?
                    <img className='loader__image' src='/images/loader.gif' /> :
                    this.state.loadgif === 'error' ? 
                    <p>invalid details</p> :
                    <p></p>
                }
                


            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startDispatchLogin: (username, password) => dispatch(startDispatchLogIn(username, password)),
        DispatchLogin: (token, username) => dispatch(DispatchLogIn(token, username))
    }
}

const mapStateToProps = (state) => {
    return {
        getstate: state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);