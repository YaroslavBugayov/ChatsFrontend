import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom'
import { Path } from "../common/enums/path.enum.ts";
import {Main} from "../components/main/main.tsx";

export const routerProvider: RouterProvider = createBrowserRouter([
    {
        path: Path.ROOT,
        element: <>
            <Main />
        </>
    },
    {
        path: Path.ANY,
        element: <Navigate to={Path.ROOT} />
    }
])