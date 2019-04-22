

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './reducers'

const persistConfig = {
    key: 'cards',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const loggerMiddleware = createLogger()


const configStore = async () => {
    const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware, loggerMiddleware))
    const persistor = persistStore(store)
    await persistor.flush();
    return { persistor, store }
}
export default configStore
