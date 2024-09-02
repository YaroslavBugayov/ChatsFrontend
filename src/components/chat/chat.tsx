import { FC, JSX, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/auth-slice.ts';
import { IoArrowBack } from 'react-icons/io5';
import {
    useJoinRoomMutation,
    useLeaveRoomMutation, useSendMessageMutation,
    useSubscribeToChatEventQuery
} from '../../features/websocket/ws-api-slice.ts';
import { Message } from '../../models/message.model.ts';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface ChatProps {
    chatId: string,
    handleSwitchRoom: () => void,
}

interface FormData {
    message: string;
}

export const Chat: FC = (props: ChatProps): JSX.Element => {
    const currentUser = useSelector(selectUser);
    const [joinRoom] = useJoinRoomMutation();
    const [leaveRoom] = useLeaveRoomMutation();
    const {data}: { data: Message[] } = useSubscribeToChatEventQuery();
    const [sendMessage] = useSendMessageMutation();
    const chatRef = useRef<HTMLElement>();

    const { register, handleSubmit, reset } = useForm<FormData>();

    useEffect(() => {
        if (props.chatId) {
            joinRoom({id: props.chatId});
        }
        return () => {
            leaveRoom({id: props.chatId});
        }
    }, [props.chatId, joinRoom, leaveRoom]);

    useEffect(() => {
        chatRef.current?.lastElementChild?.scrollIntoView();
    }, [data]);

    const onSubmit: SubmitHandler<FormData> = async data => {
        try {
            if (data.message) {
                sendMessage({ messageText: data.message, roomId: props.chatId });
                reset();
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

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
                        <div ref={chatRef} className="chat_content">
                            {data?.filter(item => item.roomId == props.chatId)?.map((message: Message, index: number) => (
                                <div
                                    key={index}
                                    className={`chat_message ${
                                        message.username === currentUser.username
                                            ? 'chat_message-my'
                                            : ''
                                    }`}>
                                    <span className="chat_message-username">{message.username}</span>
                                    <span>{message.messageText}</span>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={ handleSubmit(onSubmit) } className="chat_message-form">
                            <input { ...register("message") } className="form_message-input" type="text"/>
                            <input className="form_message-button" type="submit" value="Send"/>
                        </form>
                    </div>
                </div>
                : null}
        </div>
    );
}