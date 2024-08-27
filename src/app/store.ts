import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/auth-slice.ts';
import { apiSlice } from '../api/api-slice.ts';
import authReducer from '../features/auth/auth-slice.ts';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.dispatch>;