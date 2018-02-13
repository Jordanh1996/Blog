import React from 'react';
import {connect} from 'react-redux';
import {Route, Link} from 'react-router-dom';
import Header from '../components/header';

const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <div>
        <Route {...rest} component={(props) => (
            isAuthenticated ? (
                <div>
                    <Component {...props} />
                </div>
            ) : (
                <div>
                    <Header />
                    <p>
                        You need to log in to view this page, click <Link to='/login'>here</Link> to log in
                    </p>
                    <p>
                        You don't have a user yet? click <Link to='/register'>here</Link> to register
                    </p>
                </div>
            )
        )}/>
    </div>
)

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.user.token
})

export default connect(mapStateToProps)(PrivateRoute);