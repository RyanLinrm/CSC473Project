import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Amplify  from 'aws-amplify';
import aws_exports from './aws-exports';

import * as firebase from 'firebase';
import fbConfig from './firebase-config';

Amplify.configure(aws_exports);
firebase.initializeApp(fbConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
