import { createSlice } from '@reduxjs/toolkit';
import { Room } from '../../models/room.model.ts';

interface WsState {
    users: string[];
    rooms: Room[];
}

const initialState: WsState = {
    users: [],
    rooms: []
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
        }
    }
})

export const { setUsers, setRooms } = wsSlice.actions;

export default wsSlice.reducer;

export const selectUsers = (state: { ws: WsState }) => state.ws.users;
export const selectRooms = (state: { ws: WsState }) => state.ws.rooms;