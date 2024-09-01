import { FC, JSX } from 'react';
import { Room } from '../../models/room.model.ts';
import { RoomModal } from '../room-modal/room-modal.tsx';

interface RoomsProps {
    rooms: Room[]
}

export const Rooms: FC = (props: RoomsProps): JSX.Element => {


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
                                    <button>Join</button>
                                </li>
                            ))}
                        </ul>
                    </>}
                <button>Create new room</button>
            </div>
            <RoomModal />
        </>
    )
}