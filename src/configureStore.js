import { createStore, applyMiddleware } from 'redux';
import todoApp from './reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

const configureStore = () => {
    const middlewares = [thunk];
    if(process.env.NOCE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    return createStore(
        todoApp,
        applyMiddleware(...middlewares)
    );

};

export default configureStore;