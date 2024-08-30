import { FC, JSX, useEffect, useLayoutEffect } from 'react';
import { UsersList } from '../users-list/users-list.tsx';
import { Rooms } from '../rooms/rooms.tsx';
import {
    useConnectMutation,
    useDisconnectMutation,
    useSendUsernameMutation,
    useSubscribeToEventQuery
} from '../../features/websocket/ws-api-slice.ts';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../features/websocket/ws-slice.ts';
import { selectUser } from '../../features/auth/auth-slice.ts';

export const Main: FC = (): JSX.Element => {
    const [connect] = useConnectMutation();
    const [sendUsername] = useSendUsernameMutation();
    const [disconnect] = useDisconnectMutation();
    const { data, isLoading, error } = useSubscribeToEventQuery();

    const currentUser = useSelector(selectUser);
    const users = useSelector(selectUsers);

    useLayoutEffect(() => {
        connect();
    }, [connect]);

    useEffect(() => {
        if (data) {
            if (currentUser?.username) {
                sendUsername({ username: currentUser.username });
            }
            return () => {
                disconnect();
            };
        }
    }, [currentUser?.username, sendUsername, disconnect, data]);

    return (
        <div id="main-page">
            <Rooms />
            <UsersList users={users} />
        </div>
    )
}