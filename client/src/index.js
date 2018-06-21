import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

import { loadState, saveState} from './assets/LocalStorage'
import { loadTokenToStore } from './actions/token-actions';

import store from './store/store';
// import BrowserHistory from './history';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

import App from './components/App';

// const history = syncHistoryWithStore(BrowserHistory, store);

// Dispatch user token to store
const userState = loadState();
if (userState) store.dispatch(loadTokenToStore(userState))


render((
  <Provider store={store}>
  <Router>
    <App />
  </Router>
  </Provider>
), document.getElementById('root'));
