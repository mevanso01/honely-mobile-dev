import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import logger from 'redux-logger'
import reducer from './reducer'

const persistConfig = {
  timeout: null,
  key: 'root',
  storage: AsyncStorage,
};

// eslint-disable-next-line no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedReducer = persistReducer(persistConfig, reducer);
const enhancer = composeEnhancers(applyMiddleware(thunk, logger));

export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);
