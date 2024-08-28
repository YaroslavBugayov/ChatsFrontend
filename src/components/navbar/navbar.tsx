import './navbar.css';
import { FC, JSX, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Path } from '../../common/enums/path.enum.ts';
import { logOut, selectToken, selectUser } from '../../features/auth/auth-slice.ts';
import { useDispatch, useSelector } from 'react-redux';

export const Navbar: FC = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    const token = useSelector(selectToken);

    const [greeting, setGreeting] = useState<string>(null);

    useEffect(() => {
        setGreeting(user?.username ? `Hello, ${user.username}` : null)
    }, [user]);

    const handleNavigation = (path: Path) => {
        navigate(path);
    };

    const handleLogout = () => {
        dispatch(logOut())
    }

    return (
        <nav>
            <h2>Chats</h2>
            <p>{greeting}</p>
            <ul>
                {!token ? (
                    <>
                        <button onClick={() => handleNavigation(Path.LOGIN)}>Login</button>
                        <button onClick={() => handleNavigation(Path.REGISTER)}>Register</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => handleLogout()}>Logout</button>
                    </>
                )}
            </ul>
        </nav>
    )
}