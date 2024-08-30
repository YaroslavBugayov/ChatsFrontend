import { FC, JSX, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectToken } from '../../features/auth/auth-slice.ts';

export const Private: FC = (): JSX.Element => {
    const navigate = useNavigate();

    const token = useSelector(selectToken);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token]);

    return (
        <>
            {token ? <Outlet></Outlet> : null}
        </>
    );
}