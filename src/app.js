import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import Website from './routers/appRouter';
import 'react-dates/lib/css/_datepicker.css';
import LoadingPage from './components/loadingPage';
import configureStore from './store/configureStore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './config/config';

const store = configureStore();

export const persistor = persistStore(store);

const jsx = (
    <Provider store={store}>
        <PersistGate loading={<LoadingPage />} persistor={persistor}>
            <MuiThemeProvider>
                <Website />
            </MuiThemeProvider>
        </PersistGate>
    </Provider>
);


let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx , document.getElementById('app'));
        hasRendered = true;
    }
};


ReactDOM.render(<LoadingPage />, document.getElementById('app'));


renderApp();
