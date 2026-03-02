import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import tagsReducer from './slice/tagSlice';
import protagsReducer from './slice/professional-tags-slice/proTagSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer  from './slice/userSlice';
import appearanceReducer from './slice/appearanceSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  tags: tagsReducer,
  proTags: protagsReducer,
  user:userReducer,
  appearance: appearanceReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'tags', 'proTags' ,'user', 'appearance'],
};
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
