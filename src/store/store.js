import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware';

import videos from './reducers';

// Init the store with the necessary middleware
const store = createStore(
    // The App store
    videos,
    // REDUX debugging
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        // Promise middleware used for handling async actions like http requests
        promiseMiddleware(),
    ),
);

export default store;