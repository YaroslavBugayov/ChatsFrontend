import { createSlice } from '@reduxjs/toolkit';

interface WsState {
    users: string[]
}

const initialState: WsState = {
    users: []
}

const wsSlice = createSlice({
    name: "websocket",
    initialState: initialState,
    reducers: {
        setUsers: (state, action) => {
            const { users } = action.payload;
            state.users = users;
        },
    }
})

export const { setUsers } = wsSlice.actions;

export default wsSlice.reducer;

export const selectUsers = (state: { ws: WsState }) => state.ws.users;