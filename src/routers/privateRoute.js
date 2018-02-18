import React from 'react';
import {connect} from 'react-redux';
import {Route, Link} from 'react-router-dom';

import SideBar from '../components/sideBar';
import Header from '../components/header';

const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <div>
        <Route {...rest} component={(props) => (
            <div className="header__divide">
            <Header />
            <div className="content-container__page">
                <SideBar />
                {
                    isAuthenticated ? 
                    <Component {...props} /> :
                    <div>
                        <p>
                            You need to log in to view this page, click <Link to='/login'>here</Link> to log in
                        </p>
                        <p>
                            You don't have a user yet? click <Link to='/register'>here</Link> to register
                        </p>
                    </div>
                }
            </div>
        </div>
        )}/>
    </div>
)

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.user.token
})

export default connect(mapStateToProps)(PrivateRoute);