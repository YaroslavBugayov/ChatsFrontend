import { FC, JSX, useEffect, useRef } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useCreateRoomMutation } from '../../features/websocket/ws-api-slice.ts';

interface FormData {
    name: string;
}

interface RoomModalProps {
    handleSwitchModal: () => void;
}

export const RoomModal: FC = (props: RoomModalProps): JSX.Element => {
    const nameInputRef = useRef<HTMLInputElement>();
    const [createRoom] = useCreateRoomMutation();

    const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
    const onSubmit: SubmitHandler<FormData> = async data => {
        try {
            if (data.name) {
                createRoom(data);
                props.handleSwitchModal(false);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        nameInputRef.current?.focus();
    }, []);

    return (
        <div className="modal">
            <div className="modal-content">
                <button onClick={ () => { props.handleSwitchModal(false); } } className="close-button"><IoCloseOutline/></button>
                <form onSubmit={ handleSubmit(onSubmit) } className="modal-form">
                    <label>Enter new room name:</label>
                    <input ref={ nameInputRef } { ...register("name") } type="text"/>
                    <button type="submit">Create</button>
                </form>
            </div>
        </div>
    )
}