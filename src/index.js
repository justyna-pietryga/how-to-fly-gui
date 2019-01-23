import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AppContainer } from "./components/App";
import { store } from "./store";
import { Provider } from "react-redux";
import registerServiceWorker from './registerServiceWorker';
import reduxThunk from 'redux-thunk';
import {applyMiddleware, createStore} from "redux";

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>, document.getElementById('root'));
registerServiceWorker();

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
