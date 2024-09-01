import { createSlice } from '@reduxjs/toolkit';

interface User {
    username: string;
    email: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user')),
    token: localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
        },
        logOut(state, action) {
            state.user = null;
            state.token = null;

            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;