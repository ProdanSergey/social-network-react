import { createStore, applyMiddleware, compose} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import reducers from '../reducers';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import BrowserHistory from '../history';

const middleware = routerMiddleware(BrowserHistory);

const logger = createLogger();
const store = createStore(
    connectRouter(BrowserHistory)(reducers), 
    compose(
        applyMiddleware(middleware),
        applyMiddleware(thunkMiddleware), 
        applyMiddleware(logger),
        )
    );

export default store;