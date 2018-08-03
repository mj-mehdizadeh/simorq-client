import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import rootSaga from '../Sagas';

// creates the store
export default function configureStore() {
  const middleware = [];
  const enhancers = [];

  /* ------------- Middleware ------------- */
  //middleware.push(someMiddleware)

  /* ------------- Saga Middleware ------------- */
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  /* ------------- Assemble Middleware ------------- */
  enhancers.push(applyMiddleware(...middleware));

  /* ------------- Redux Configuration ------------- */
  const store = createStore(reducer, compose(...enhancers));
  // kick off root saga
  sagaMiddleware.run(rootSaga);

  return store;
}
