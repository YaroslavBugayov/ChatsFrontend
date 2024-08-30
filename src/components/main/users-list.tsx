import { FC, JSX, useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUsers, setUsers } from '../../features/websocket/ws-slice.ts';
import { useSubscribeToEventQuery } from '../../features/websocket/ws-api-slice.ts';

export const UsersList: FC = (): JSX.Element => {
    const {data, isLoading, error} = useSubscribeToEventQuery();
    const users = useSelector(selectUsers);

    useEffect(() => {
        if (users) {
            console.log(users)
        }
    }, [users]);

    return (
        <ul>
            {users && users.length > 0
                ? (users.map((user, index) => (
                    <li key={index}>{user}</li>
                )))
                : <li>No users found</li>
            }
        </ul>
    )
}