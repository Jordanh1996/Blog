import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import SideBar from '../components/sideBar';
import Header from '../components/header';

const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route 
        {...rest} 
        component={(props) => (
            isAuthenticated ? (
                <Redirect to='/' />
            ) : (
                <div className="header__divide">
                    <Header />
                    <div className="content-container__page">
                        <SideBar />
                        <Component {...props} />
                    </div>
                </div>
            )
        )}
    />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.user.token
});

export default connect(mapStateToProps)(PublicRoute);
