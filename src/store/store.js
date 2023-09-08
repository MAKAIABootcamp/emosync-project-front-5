import { configureStore } from '@reduxjs/toolkit';
import { firebaseApi } from './api/firebaseApi';
import { userSlice } from './slides/user/user';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [firebaseApi.reducerPath]: firebaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(firebaseApi.middleware)
});