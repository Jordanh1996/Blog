import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import BlogReducer from '../reducers/blog';
import UserReducer from '../reducers/log';
import thunk from 'redux-thunk';

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const userPersistConfig = {
    key: 'user',
    storage: localStorage
}

export default () => {
    let store = createStore(
    combineReducers({
        blogs: BlogReducer,
        user: persistReducer(userPersistConfig, UserReducer)
    }),
    composeEnchancers(applyMiddleware(thunk))
    )
    return store
}

