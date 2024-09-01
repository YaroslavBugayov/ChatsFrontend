import {  setUsers } from './ws-slice.ts';
import io from 'socket.io-client';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import Socket = SocketIOClient.Socket;
import { SocketEvent } from '../../common/enums/socket-event.enum.ts';

const serverUrl: string = import.meta.env.VITE_SERVER_URL;

let socket: Socket;

const getSocket = (): Socket => {
    console.log(serverUrl)
    if (!socket) {
        socket = io(serverUrl, {
            withCredentials: true,
        });
    }
    return socket;
}

export const wsApiSlice = createApi({
    reducerPath: 'wsApi',
    baseQuery: fakeBaseQuery(),
    endpoints: builder => ({
        subscribeToEvent: builder.query<never, void>({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(_arg, { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCacheData }) {
                try {
                    await cacheDataLoaded;

                    socket = getSocket();

                    socket.on(SocketEvent.CONNECT, () => {
                        console.log('connected to socket.io');
                    });

                    socket.on(SocketEvent.USERS, (data) => {
                        dispatch(setUsers(JSON.parse(data)));
                    });

                    socket.on(SocketEvent.DISCONNECT, () => {
                        console.log('disconnected from socket.io');
                    });

                    await cacheEntryRemoved;

                    socket.off(SocketEvent.CONNECT);
                    socket.off(SocketEvent.USERS);
                    socket.off(SocketEvent.DISCONNECT);
                } catch (error) {
                    console.error(error);
                }
            }
        }),

        sendUsername: builder.mutation<void, { username: string }>({
            queryFn: ({ username }) => {
                if (socket) {
                    socket.emit(SocketEvent.USERNAME, username);
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

export const { useSubscribeToEventQuery, useSendUsernameMutation, useDisconnectMutation } = wsApiSlice;