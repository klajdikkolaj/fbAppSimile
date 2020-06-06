import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/styles.css';
import App from './app/layout/App';
import {Router} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-widgets/dist/css/react-widgets.css';
import 'mobx-react-lite/batchingForReactDom'
import {createBrowserHistory} from 'history'
import * as serviceWorker from './serviceWorker';
import ScrollOnTop from './app/layout/ScrollOnTop';
import dateFnsLocalizer from 'react-widgets-date-fns';

dateFnsLocalizer();

export const history = createBrowserHistory();
ReactDOM.render(
    <Router history={history}>
        <ScrollOnTop/>
        <App/>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
