import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import saga from '../sagas';

//  Returns the store instance
// It can  also take initialState argument when provided
const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    return {
        ...createStore(reducer,
            applyMiddleware(sagaMiddleware, logger)),
        runSaga: sagaMiddleware.run(saga)
    };
};

export default configureStore;