import React from 'react';
import {Route} from 'react-router-dom';
import SideBar from '../components/sideBar';
import Header from '../components/header';

const StructuredRoute = ({
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => (
            <div className="header__divide">
                <Header />
                <div className="content-container__page">
                    <SideBar /> 
                    <Component {...props} />
                </div>
                
            </div>
    )}/>
)



export default StructuredRoute;