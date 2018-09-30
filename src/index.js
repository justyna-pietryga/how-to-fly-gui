import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AppContainer } from "./components/App";
import { store } from "./store";
import { Provider } from "react-redux";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
