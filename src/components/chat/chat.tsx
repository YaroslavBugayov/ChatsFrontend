import { FC, JSX, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/auth-slice.ts';
import { IoArrowBack } from 'react-icons/io5';

interface ChatProps {
    chatId: string,
    handleSwitchRoom: () => void
}

export const Chat: FC = (props: ChatProps): JSX.Element => {


    const currentUser = useSelector(selectUser);

    return (
        <div className="chat">
            {props.chatId
                ? <>
                    <button onClick={ () => { props.handleSwitchRoom(null); } }><IoArrowBack /></button>
                </>
                : null}
        </div>
    );
}