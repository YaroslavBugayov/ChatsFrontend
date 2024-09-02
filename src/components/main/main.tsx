import { FC, JSX, useCallback, useEffect, useState } from 'react';
import { UsersList } from '../users-list/users-list.tsx';
import { Rooms } from '../rooms/rooms.tsx';
import {
    useDisconnectMutation,
    useSubscribeToEventQuery
} from '../../features/websocket/ws-api-slice.ts';
import { useSelector } from 'react-redux';
import { selectRooms, selectUsers } from '../../features/websocket/ws-slice.ts';
import { selectUser } from '../../features/auth/auth-slice.ts';
import { Chat } from '../chat/chat.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { Path } from '../../common/enums/path.enum.ts';

export const Main: FC = (): JSX.Element => {
    const users = useSelector(selectUsers);
    const rooms = useSelector(selectRooms);
    const currentUser = useSelector(selectUser);

    const [disconnect] = useDisconnectMutation();
    const [currentChat, setCurrentChat] = useState<string | null>(null);
    const { data, isLoading } = useSubscribeToEventQuery({ username: currentUser.username });
    const navigate = useNavigate();

    const handleSwitchRoom = useCallback((state: string | null) => {
        setCurrentChat(state)
    }, []);

    useEffect(() => {
        if (currentChat) {
            navigate(`${Path.CHAT}/${currentChat}`, { replace: true });
        } else {
            navigate(Path.ROOT, { replace: true });
        }
    }, [currentChat, navigate]);
    
    useEffect(() => {
        return () => {
            disconnect();
        }
    }, [disconnect]);

    return (
        <div id="main-page">
            { currentChat !== null
            ? <Chat chatId={currentChat} handleSwitchRoom={handleSwitchRoom} />
            : <Rooms rooms={rooms} handleSwitchRoom={handleSwitchRoom} />}
            <UsersList users={users} />
        </div>
    )
}