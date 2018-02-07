import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {startDispatchLogOut} from '../actions/log';



class Header extends React.Component {

    onSignOut = () => {
        this.props.dispatchSignOut(this.props.token)
    }

    render() {
        return (
            <header>
                <div>
                    <div>
                        <Link to='/'>
                            <h1>Home</h1>
                        </Link>
        
                        {
                            this.props.token ? 
                            <button
                            onClick={this.onSignOut}
                            >
                                Log Out
                            </button>
                            :
                            <Link to='/login'>
                                <p>Log in</p>
                            </Link>
                        }
        
        
                        <Link to='/addblog'>
                            <p>Add Blog</p>
                        </Link>
                    </div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.user.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchSignOut: (token) => dispatch(startDispatchLogOut(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);