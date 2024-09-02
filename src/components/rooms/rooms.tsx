import { FC, JSX, useCallback, useState } from 'react';
import { Room } from '../../models/room.model.ts';
import { RoomModal } from '../room-modal/room-modal.tsx';

interface RoomsProps {
    rooms: Room[],
    handleSwitchRoom: () => void
}

export const Rooms: FC = (props: RoomsProps): JSX.Element => {
    const [isModalActive, setModalActive] = useState<boolean>(false);

    const handleSwitchModal = useCallback((state: boolean) => {
        setModalActive(state);
    }, []);

    return (
        <>
            <div className="rooms">
                {props.rooms.length == 0
                    ? <h3>Create first room</h3>
                    :
                    <>
                        <h3>Rooms</h3>
                        <ul className="rooms-list">
                            {props.rooms.map((room: Room, index: number) => (
                                <li key={index} className="room">
                                    <div><h3>{room.name}</h3></div>
                                    <div>Users in this chat:</div>
                                    <ul>
                                        {room.users.map((user: string, index: number) => (
                                            <li key={index}>{user}</li>
                                        ))}
                                    </ul>
                                    <button onClick={ () => { props.handleSwitchRoom(room.id) } }>Join</button>
                                </li>
                            ))}
                        </ul>
                    </>}
                <button onClick={ () => { handleSwitchModal(true) } }>Create new room</button>
            </div>
            { isModalActive ? <RoomModal handleSwitchModal={handleSwitchModal} /> : null }
        </>
    )
}