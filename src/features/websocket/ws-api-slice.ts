import { setRooms, setUsers } from './ws-slice.ts';
import io from 'socket.io-client';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import Socket = SocketIOClient.Socket;
import { SocketEvent } from '../../common/enums/socket-event.enum.ts';

const serverUrl: string = import.meta.env.VITE_SERVER_URL;

let socket: Socket;

const getSocket = (username: string): Socket => {
    console.log(serverUrl)
    if (!socket) {
        socket = io(serverUrl, {
            withCredentials: true,
            query: { username: username }
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
            async onCacheEntryAdded(username, { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCacheData }) {
                try {
                    await cacheDataLoaded;

                    socket = getSocket(username);

                    socket.on(SocketEvent.CONNECT, () => {
                        console.log('connected to socket.io');
                    });

                    socket.on(SocketEvent.USERS, (data) => {
                        dispatch(setUsers(JSON.parse(data)));
                    });

                    socket.on(SocketEvent.ROOMS, (data) => {
                        dispatch(setRooms(JSON.parse(data)));
                    })

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

export const { useSubscribeToEventQuery, useDisconnectMutation } = wsApiSlice;