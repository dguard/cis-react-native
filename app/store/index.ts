import AsyncStorage from '@react-native-community/async-storage'
import rootReducers from 'app/store/reducers' // where reducers is a object of reducers
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { persistCombineReducers, persistStore } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
  debug: true, // to get useful logging
}

const middleware = []
const sagaMiddleware = createSagaMiddleware()

middleware.push(sagaMiddleware)

if (__DEV__) {
  middleware.push(createLogger())
}

const reducers = persistCombineReducers(config, rootReducers)
const enhancers = [applyMiddleware(...middleware)]
// const initialState = {};
const persistConfig: any = { enhancers }
const store = createStore(reducers, undefined, compose(...enhancers))
const persistor = persistStore(store, persistConfig, () => {
  console.log('Test', store.getState())
})
const configureStore = () => ({ persistor, store })

export default configureStore
