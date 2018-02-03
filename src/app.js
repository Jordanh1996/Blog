import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, NavLink, Route, Switch, Link} from 'react-router-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import Website, {history} from './routers/AppRouter';
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/loadingPage';
import configureStore from './store/configureStore';

const store = configureStore()

const jsx = (
    <Provider store={store}>
        <Website />
    </Provider>
)

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx , document.getElementById("app"));
        hasRendered = true;
    }
}


ReactDOM.render(<LoadingPage />, document.getElementById("app"))


renderApp()
