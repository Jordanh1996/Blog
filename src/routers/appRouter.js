import React from 'react';
import { Router, Switch } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';
import StructuredRoute from './structuredRoute';
import createHistory from 'history/createBrowserHistory';
import Notfound from '../components/notfound';
import Dashboard from '../components/Dashboard';
import AddBlog from '../components/addblog';
import Blog from '../components/blog';
import Sign from '../components/sign';
import EditBlog from '../components/editblog';
import SearchBlogs from '../components/searchBlogs';

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
                <PublicRoute path="/sign" component={Sign} />
                <StructuredRoute component={Notfound} />
            </Switch>
        </div>
    </Router>
);

export default Website;
