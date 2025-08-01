import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
      auth: authReducer,
    });     

const persistConfig = {
      key: 'root',
      storage,
      whitelist : ['auth']
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, 
        }),
    });

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;