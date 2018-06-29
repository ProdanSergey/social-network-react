import React                        from 'react';
import { render }                   from 'react-dom';
import { Provider }                 from 'react-redux';
import { ConnectedRouter }          from 'connected-react-router';
import BrowserHistory               from './history';

import { loadState }                from './assets/LocalStorage';
import { loadTokenToStore }         from './actions/token-actions';

import store from './store/store';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

import App from './components/App';

const userState = loadState();
if (userState) {
    store.dispatch(loadTokenToStore(userState));
}

render((
  <Provider store={store}>
    <ConnectedRouter history={BrowserHistory}>
        <App />
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));
