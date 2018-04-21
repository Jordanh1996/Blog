import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { persistor } from '../app';
import { dispatchLogOut } from '../actions/log';
import { logout } from '../axios/log';
import { dispatchRemoveBlogs } from '../actions/myblogs';


class Header extends React.Component {

    onSignOut = () => {
        persistor.purge();
        logout(this.props.token).then(() => {
            this.props.dispatchRemoveMyBlogs();
            this.props.dispatchLogout();
        });
    }

    render() {
        return (
                    <div className="header__content">
                        <Link to='/' className="header__title">
                            Home
                        </Link>
                        
                        <Link to='/search' className="header__item">
                            Search Blogs
                        </Link>

                        {
                            this.props.token ? 
                            [
                                <button onClick={this.onSignOut} className="header__item" key={1}>
                                    Sign out
                                </button>,
                                <button onClick={this.onSignOut} className="header__item" key={2}>
                                    Profile
                                </button>
                            ]
                            :
                            [
                                <Link 
                                    to='/sign' 
                                    className="header__item"
                                    key={1}
                                >
                                    <p>Sign in</p>
                                </Link>,
                                <Link 
                                to='/sign' 
                                className="header__item"
                                key={2}
                                >
                                    Register
                                </Link>
                            ]
                        }

                        <Link 
                            to='/addblog' 
                            className="header__item"
                        >
                            Add Blog
                        </Link>
                    </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.user.token
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchLogout: () => dispatch(dispatchLogOut()),
        dispatchRemoveMyBlogs: () => dispatch(dispatchRemoveBlogs())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
