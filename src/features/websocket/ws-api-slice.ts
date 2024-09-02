import { setErrorMessage, setRooms, setUsers } from './ws-slice.ts';
import io from 'socket.io-client';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import Socket = SocketIOClient.Socket;
import { SocketEvent } from '../../common/enums/socket-event.enum.ts';
import { Message } from '../../models/message.model.ts';

const serverUrl: string = import.meta.env.VITE_SERVER_URL;

let socket: Socket;

const getSocket = (username: string): Socket => {
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
        subscribeToEvent: builder.query<never, { username: string }>({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(
                { username },
                { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCacheData }
            ) {
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
                    });

                    socket.on(SocketEvent.ERROR, (data) => {
                        dispatch(setErrorMessage(JSON.parse(data)));
                    });

                    socket.on(SocketEvent.DISCONNECT, () => {
                        socket = null;
                        console.log('disconnected from socket.io');
                    });

                    await cacheEntryRemoved;

                    socket.off(SocketEvent.CONNECT);
                    socket.off(SocketEvent.USERS);
                    socket.off(SocketEvent.ROOMS);
                    socket.off(SocketEvent.ERROR);
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
        }),

        createRoom: builder.mutation<void, void>({
            queryFn: ({ name }: { name: string }) => {
                socket.emit(SocketEvent.CREATE_ROOM, { name: name });
                return {data: null};
            }
        }),

        joinRoom: builder.mutation<void, void>({
            queryFn: ({ id }: { id: string }) => {
                console.log(`joined room ${id}`);
                socket.emit(SocketEvent.JOIN_ROOM, { id: id });
                return {data: null};
            }
        }),

        leaveRoom: builder.mutation<void, void>({
            queryFn: ({ id }: { id: string }) => {
                console.log(`leaved room ${id}`);
                socket.emit(SocketEvent.LEAVE_ROOM, { id: id });
                return {data: null};
            }
        }),

        subscribeToChatEvent: builder.query<Message[], void>({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(
                _args,
                { dispatch, cacheDataLoaded, cacheEntryRemoved, updateCachedData }
            ) {
                try {
                    await cacheDataLoaded;

                    if (!socket) {
                        dispatch(setErrorMessage({ errorMessage: 'No connection' }));
                        return;
                    }

                    socket.on(SocketEvent.MESSAGE, (data: Message) => {
                        updateCachedData(draft => {
                            draft.push(data);
                        });
                    });

                    await cacheEntryRemoved;

                    socket?.off(SocketEvent.MESSAGE);
                } catch (error) {
                    console.error(error);
                }
            }
        }),

        sendMessage: builder.mutation<void, void>({
            queryFn: ({ messageText, roomId }: { messageText: string, roomId: string }) => {
                socket.emit(SocketEvent.MESSAGE, { messageText: messageText, roomId: roomId });
                return {data: null};
            }
        }),
    })
});

export const {
    useSubscribeToEventQuery,
    useSubscribeToChatEventQuery,
    useDisconnectMutation,
    useCreateRoomMutation,
    useJoinRoomMutation,
    useLeaveRoomMutation,
    useSendMessageMutation
} = wsApiSlice;