import { FC, JSX } from 'react';
import { Navbar } from '../navbar/navbar.tsx';
import { Outlet } from 'react-router-dom';

export const Layout: FC = (): JSX.Element => {


    return (
        <>
            <Navbar />
            <main>
                <Outlet></Outlet>
            </main>
        </>
    )
}