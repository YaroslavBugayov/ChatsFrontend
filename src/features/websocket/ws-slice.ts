import { createSlice } from '@reduxjs/toolkit';
import { Room } from '../../models/room.model.ts';

interface WsState {
    users: string[];
    rooms: Room[];
    errorMessage: string;
}

const initialState: WsState = {
    users: [],
    rooms: [],
    errorMessage: null
}

const wsSlice = createSlice({
    name: "websocket",
    initialState: initialState,
    reducers: {
        setUsers: (state, action) => {
            const { users } = action.payload;
            state.users = users;
        },

        setRooms: (state, action) => {
            const { rooms } = action.payload;
            state.rooms = rooms;
        },

        setErrorMessage: (state, action) => {
            const { errorMessage } = action.payload;
            state.errorMessage = errorMessage;
        }
    }
})

export const { setUsers, setRooms, setErrorMessage } = wsSlice.actions;

export default wsSlice.reducer;

export const selectUsers = (state: { ws: WsState }) => state.ws.users;
export const selectRooms = (state: { ws: WsState }) => state.ws.rooms;
export const selectErrorMessage = (state: { ws: WsState }) => state.ws.errorMessage;