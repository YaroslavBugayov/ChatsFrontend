import { FC, JSX } from 'react';
import { IoCloseOutline } from "react-icons/io5";

export const RoomModal: FC = (): JSX.Element => {

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button"><IoCloseOutline/></button>
                <form className="modal-form">
                    <label>Enter new room name:</label>
                    <input type="text"/>
                    <input type="submit" value="Create"/>
                </form>
            </div>
        </div>
    )
}