import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import BlogReducer from '../reducers/blog';
import thunk from 'redux-thunk';

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
    const store = createStore(
    BlogReducer,
    composeEnchancers(applyMiddleware(thunk))
)

    
    return store;
}

