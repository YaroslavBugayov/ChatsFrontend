import { apiSlice } from '../../api/api-slice.ts';

interface Credentials {
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
       login: builder.mutation<AuthResponse, Credentials>({
           query: credentials => ({
               url: '/auth/signin',
               method: 'POST',
               body: credentials,
           })
       })
   })
});

export const { useLoginMutation } = authApiSlice;