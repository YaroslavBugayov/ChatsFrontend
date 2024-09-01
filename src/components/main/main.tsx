import { FC, JSX, useEffect } from 'react';
import { UsersList } from '../users-list/users-list.tsx';
import { Rooms } from '../rooms/rooms.tsx';
import {
    useDisconnectMutation,
    useSubscribeToEventQuery
} from '../../features/websocket/ws-api-slice.ts';
import { useSelector } from 'react-redux';
import { selectRooms, selectUsers } from '../../features/websocket/ws-slice.ts';
import { selectUser } from '../../features/auth/auth-slice.ts';

export const Main: FC = (): JSX.Element => {
    const users = useSelector(selectUsers);
    const rooms = useSelector(selectRooms);
    const currentUser = useSelector(selectUser);

    const [disconnect] = useDisconnectMutation();
    const { data, isLoading } = useSubscribeToEventQuery(currentUser.username);

    useEffect(() => {
        if (!isLoading) {
            return () => {
                disconnect();
            }
        }
    }, [data, isLoading, disconnect]);

    return (
        <div id="main-page">
            <Rooms rooms={rooms} />
            <UsersList users={users} />
        </div>
    )
}