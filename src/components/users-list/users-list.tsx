import { FC, JSX, useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUsers, setUsers } from '../../features/websocket/ws-slice.ts';
import { useSubscribeToEventQuery } from '../../features/websocket/ws-api-slice.ts';

interface UsersListProps {
    users: string[]
}

export const UsersList: FC = (props: UsersListProps): JSX.Element => {


    return (
        <div className="users-list">
            <h3>Online</h3>
            <ul>
                {props.users && props.users.length > 0
                    ? (props.users.map((user, index) => (
                        <li key={index}>{user}</li>
                    )))
                    : <li>No users found</li>
                }
            </ul>
        </div>

    )
}