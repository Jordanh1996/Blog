import React from 'react';
import { Router, Switch } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
import StructuredRoute from './structuredRoute';
import createHistory from 'history/createBrowserHistory';
import Notfound from '../pages/notfound';
import Dashboard from '../pages/Dashboard';
import AddBlog from '../pages/addblog';
import Blog from '../pages/blog';
import Sign from '../pages/sign';
import EditBlog from '../pages/editblog';
import SearchBlogs from '../pages/searchBlogs';

export const history = createHistory();


const Website = () => (
    <Router history={history}>
        <div>
            <Switch>
                <StructuredRoute path="/" component={Dashboard} exact />
                <PrivateRoute path="/addblog" component={AddBlog} />
                <StructuredRoute path="/blog/:id" component={Blog} exact />
                <StructuredRoute path='/search' component={SearchBlogs} />
                <StructuredRoute path="/blog/edit/:id" component={EditBlog} />
                <PublicRoute path="/sign" component={Sign} />
                <StructuredRoute component={Notfound} />
            </Switch>
        </div>
    </Router>
);

export default Website;
