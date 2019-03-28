import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import rootSaga from '../sagas';

import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import {APP_VERSION} from '../constant/config';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
  version: APP_VERSION,
};

const persistedReducer = persistReducer(persistConfig, reducer);

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
  const store = createStore(persistedReducer, compose(...enhancers));
  // kick off root saga
  sagaMiddleware.run(rootSaga);

  /* ------------- Persist Redux Configuration ------------- */
  let persistor = persistStore(store);

  return {store, persistor};
}
