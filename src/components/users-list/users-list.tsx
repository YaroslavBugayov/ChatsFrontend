import { FC, JSX } from 'react';

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