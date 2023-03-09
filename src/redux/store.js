import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import searchesReducer from './searches/searches-reducer';

const middleware = [
    ...getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
    logger,
];

// Saving items to Local Storage
const itemsPersistConfig = {
    key: 'items',
    storage,
    blacklist: ['filter'],
}

// Configuring store
const store = configureStore({
    reducer: {
        searches: persistReducer(itemsPersistConfig, searchesReducer),
    },
    middleware,
    // devTools: process.env.NODE_ENV ==='development',
})

const persistor = persistStore(store);

export default {store, persistor};