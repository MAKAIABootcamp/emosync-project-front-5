import { configureStore } from '@reduxjs/toolkit';
import { firebaseApi } from './api/firebaseApi';
import { authSlice } from './slides/auth/auth';
import { userSlice } from './slides/user/user';
import { psychoSlice } from './slides/psychologist/psycho';
import { adminSlice } from './slides/admin/adminReducer';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    psycho: psychoSlice.reducer,
    [firebaseApi.reducerPath]: firebaseApi.reducer,
    admin: adminSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(firebaseApi.middleware)
});