import { createStore, 
         applyMiddleware, 
         compose }          from 'redux';
import { connectRouter, 
         routerMiddleware } from 'connected-react-router'
import { createLogger }     from 'redux-logger';
import thunkMiddleware      from 'redux-thunk';

import reducers             from '../reducers';
import BrowserHistory       from '../history';

const middleware = routerMiddleware(BrowserHistory);

const logger = createLogger();
const store = createStore(
    connectRouter(BrowserHistory)(reducers), 
        compose(
            applyMiddleware(thunkMiddleware), 
            applyMiddleware(logger),
            applyMiddleware(middleware)
        )
    );

export default store;