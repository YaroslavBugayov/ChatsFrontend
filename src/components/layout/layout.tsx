import { FC, JSX } from 'react';
import { Navbar } from '../navbar/navbar.tsx';
import { Outlet } from 'react-router-dom';
import { ErrorHandler } from '../error-handler/error-handler.tsx';

export const Layout: FC = (): JSX.Element => {


    return (
        <>
            <ErrorHandler />
            <Navbar />
            <main>
                <Outlet></Outlet>
            </main>
        </>
    )
}