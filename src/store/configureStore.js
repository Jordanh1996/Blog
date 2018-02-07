import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import BlogReducer from '../reducers/blog';
import UserReducer from '../reducers/log';
import thunk from 'redux-thunk';

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
    const store = createStore(
    combineReducers({
        blogs: BlogReducer,
        user: UserReducer
    }),
    composeEnchancers(applyMiddleware(thunk))
)

    
    return store;
}

