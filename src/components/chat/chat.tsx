import { FC, JSX, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/auth-slice.ts';
import { IoArrowBack } from 'react-icons/io5';
import {
    useJoinRoomMutation,
    useLeaveRoomMutation,
    useSubscribeToChatEventQuery
} from '../../features/websocket/ws-api-slice.ts';

interface ChatProps {
    chatId: string,
    handleSwitchRoom: () => void,
}

export const Chat: FC = (props: ChatProps): JSX.Element => {
    const currentUser = useSelector(selectUser);
    const [joinRoom] = useJoinRoomMutation();
    const [leaveRoom] = useLeaveRoomMutation();
    const { data } = useSubscribeToChatEventQuery();

    useEffect(() => {
        if (props.chatId) {
            joinRoom({ id: props.chatId });
        }
        return () => {
            leaveRoom({ id: props.chatId });
        }
    }, [props.chatId, joinRoom, leaveRoom]);

    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);

    return (
        <div className="chat">
            {props.chatId
                ? <div className="chat_wrapper">
                    <div className="chat_button-wrapper">
                        <button onClick={() => {
                            props.handleSwitchRoom(null);
                        }}><IoArrowBack/></button>
                    </div>
                    <div className="chat_main">
                        <div className="chat_content">

                        </div>
                        <form className="chat_message-form">
                            <input className="form_message-input" type="text"/>
                            <input className="form_message-button" type="submit" value="Send"/>
                        </form>
                    </div>
                </div>
                : null}
        </div>
    );
}