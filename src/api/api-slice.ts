import { BaseQueryApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { logOut, setCredentials } from '../features/auth/auth-slice.ts';
import { createApi } from '@reduxjs/toolkit/query/react';
import { RootState } from '../app/store.ts';

type ResultType = {
    status: number | string,
    data?: unknown | undefined | string,
    error?: string,
    originalStatus?: number,
}

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
    credentials: 'include',
    prepareHeaders: (headers: Headers, { getState }: { getState: RootState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: {}
): Promise<unknown> => {
    let result: { error: ResultType } | unknown = await baseQuery(args, api, extraOptions);

    if (result?.error?.originalStatus === 403) {
        const refreshResult: ResultType | unknown = await baseQuery('auth/refresh', api, extraOptions);

        if (refreshResult?.data) {
            const user = api.getState().auth.user;
            api.dispatch(setCredentials({ ...refreshResult.data, user }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }

    return result;
}

export const apiSlice = createApi({
   baseQuery: baseQueryWithReauth,
   endpoints: builder => ({})
});