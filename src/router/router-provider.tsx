import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import { Path } from "../common/enums/path.enum.ts";
import { Login } from '../components/login/login.tsx';
import { Register } from '../components/register/register.tsx';
import { Layout } from '../components/layout/layout.tsx';
import { Main } from '../components/main/main.tsx';
import { Private } from '../components/private/private.tsx';

export const routerProvider: RouterProvider = createBrowserRouter([
    {
        path: Path.ROOT,
        element: <Layout />,
        children: [
            {
                path: Path.LOGIN,
                element: <Login />
            },
            {
                path: Path.REGISTER,
                element: <Register />
            },
            {
                path: Path.ANY,
                element: <Navigate to={Path.ROOT} />
            },
            {
                path: Path.ROOT,
                element: <Private />,
                children: [
                    {
                        path: Path.ROOT,
                        element: <Main />
                    },
                    {
                        path: Path.CHAT_WITH_ID,
                        element: <Main />,
                    }
                ]
            }
        ]
    }
])