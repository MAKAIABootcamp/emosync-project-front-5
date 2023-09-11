import { configureStore } from '@reduxjs/toolkit';
import { firebaseApi } from './api/firebaseApi';
import { authSlice } from './slides/auth/auth';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [firebaseApi.reducerPath]: firebaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(firebaseApi.middleware)
});