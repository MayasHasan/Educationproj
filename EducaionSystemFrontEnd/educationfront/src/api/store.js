import { configureStore  } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import  courseReducer  from './courses/courseSlice'
import teacherReducer from './teachers/teacherSlice'
import studentReducer from './students/studentSlice'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist';
import sessionReducer from './sessions/sessionSlice';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'


const persistConfig = {
  key: 'root',
  version:1,
  storage,
}
const reducer = combineReducers({
  auth:authReducer,
  course : courseReducer,
   teacher:teacherReducer,
   session:sessionReducer,
   student :studentReducer
})
const persistedReducer = persistReducer(persistConfig, reducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),

})

export const persistor = persistStore(store)

