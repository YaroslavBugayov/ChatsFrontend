import { apiSlice } from '../../api/api-slice.ts';

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterCredentials {
    email: string;
    password: string;
}

interface AuthResponse {
    user: {
        email: string;
        username: string;
    },
    tokens: {
        accessToken: string;
    }
}

export const authApiSlice = apiSlice.injectEndpoints({
   endpoints: builder => ({
       login: builder.mutation<AuthResponse, LoginCredentials>({
           query: credentials => ({
               url: '/auth/signin',
               method: 'POST',
               body: credentials,
           })
       }),

       register: builder.mutation<AuthResponse, RegisterCredentials>({
           query: credentials => ({
               url: '/auth/signup',
               method: 'POST',
               body: credentials,
           })
       }),
   })
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;