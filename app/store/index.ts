import AsyncStorage from '@react-native-community/async-storage'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { persistCombineReducers, persistStore } from 'redux-persist'

import { rootReducers } from 'store/reducers'

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
  debug: true,
}

const middleware = [] as any

if (__DEV__) {
  middleware.push(createLogger())
}

const reducers = persistCombineReducers(config, rootReducers as any)
const enhancers = [applyMiddleware(...middleware)]

const persistConfig: any = { enhancers }
const store = createStore(reducers, undefined, compose(...enhancers))
const persistor = persistStore(store, persistConfig, () => {
  console.log('Test', store.getState())
})
export const configureStore = () => ({ persistor, store })
