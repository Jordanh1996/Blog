import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Header from '../components/header';
import Notfound from '../components/notfound';
import Dashboard from '../components/Dashboard';
import AddBlog from '../components/addblog';
import Blog from '../components/blog'


export const history = createHistory();


const Website = () => (
    <Router history={history}>
        <div>
            <Switch>
                <Route path="/" component={Dashboard} exact={true} />
                <Route path="/addblog" component={AddBlog} />
                <Route path="/:id" component={Blog} />
                <Route component={Notfound} />
            </Switch>
        </div>
    </Router>
)

export default Website;