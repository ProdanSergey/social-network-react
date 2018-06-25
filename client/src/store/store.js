import { createStore, applyMiddleware, compose} from 'redux';
import reducers from '../reducers';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const logger = createLogger();
const store = createStore(reducers, 
    compose(
        applyMiddleware(thunkMiddleware), 
        applyMiddleware(logger),
        )
    );

export default store;