import wsSlice, { selectUsers, setUsers } from './ws-slice.ts';
import io from 'socket.io-client';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import Socket = SocketIOClient.Socket;
import { logOut } from '../auth/auth-slice.ts';

let socket: Socket | null = null;

export const wsApiSlice = createApi({
    reducerPath: 'wsApi',
    baseQuery: fakeBaseQuery(),
    endpoints: builder => ({
        connect: builder.mutation<any, any>({
            queryFn: () => {
                if (!socket) {
                    socket = io('http://localhost:3000');

                    socket.on('connect', () => {
                        console.log('connected to socket.io');
                    });

                    socket.on('disconnect', () => {
                        console.log('disconnected from socket.io');
                    });
                }

                return { data: null };
            }
        }),

        subscribeToEvent: builder.query<any, void>({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(_arg, { dispatch, cacheEntryRemoved, getState, getCacheEntry }) {
                if (!socket) return;
                console.log("huyog blyat")
                socket.on('users', (data) => {
                    dispatch(setUsers(JSON.parse(data)));
                });

                await cacheEntryRemoved;
                socket?.off('users');
            }
        }),

        sendUsername: builder.mutation<void, { username: string }>({
            queryFn: ({ username }) => {
                if (socket) {
                    socket.emit('username', username);
                }
                return {data: null};
            }
        }),

        disconnect: builder.mutation<void, void>({
            queryFn: () => {
                if (socket) {
                    socket.disconnect();
                    socket = null;
                }
                return {data: null};
            }
        })
    })
});

export const { useSubscribeToEventQuery, useSendUsernameMutation, useDisconnectMutation, useConnectMutation } = wsApiSlice;