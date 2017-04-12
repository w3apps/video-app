import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware';

import videos from './reducers';

const store = createStore(
    videos,
    // REDUX debugging
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        promiseMiddleware(),
    ),
);

export default store;