import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dashboard from './components/Dashboard';
import * as serviceWorker from './serviceWorker';
import {GeoContextProvider} from './GeoContext/GeoContextProvider';

ReactDOM.render(<GeoContextProvider ><Dashboard /></GeoContextProvider >, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
