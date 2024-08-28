import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/auth-slice.ts';
import { apiSlice } from '../api/api-slice.ts';
import authReducer from '../features/auth/auth-slice.ts';
import wsSlice from '../features/websocket/ws-slice.ts';
import wsReducer from '../features/websocket/ws-slice.ts';
import { wsApiSlice } from '../features/websocket/ws-api-slice.ts';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        [wsApiSlice.reducerPath]: wsApiSlice.reducer,
        ws: wsReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware, wsApiSlice.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.dispatch>;