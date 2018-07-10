import React                        from 'react';
import { render }                   from 'react-dom';
import { Provider }                 from 'react-redux';
import { ConnectedRouter }          from 'connected-react-router';
import BrowserHistory               from './history';

import store from './store/store';
import App from './components/App';

render((
  <Provider store={store}>
    <ConnectedRouter history={BrowserHistory}>
        <App />
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));
