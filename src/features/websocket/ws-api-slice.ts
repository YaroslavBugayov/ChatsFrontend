import wsSlice, { selectUsers, setUsers } from './ws-slice.ts';
import io from 'socket.io-client';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

export const wsApiSlice = createApi({
    reducerPath: 'wsApi',
    baseQuery: fakeBaseQuery(),
    endpoints: builder => ({
        subscribeToEvent: builder.query<any, void>({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(_arg, { dispatch, cacheEntryRemoved, getState, getCacheEntry }) {
                const socket = io('http://localhost:3000');

                socket.on('connect', () => {
                    console.log('connected to socket.io');

                    socket.on('message', (data) => {
                        dispatch(setUsers(JSON.parse(data)));
                    })
                })

                socket.on('disconnect', reason => {
                    console.log(reason);
                })
            }
        })
    })
});

export const { useSubscribeToEventQuery } = wsApiSlice;