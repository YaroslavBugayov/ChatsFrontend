import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Path} from "../common/enums/path.enum.ts";

export const routerProvider: RouterProvider = createBrowserRouter([
    {
        path: Path.ROOT,
        element: <h1>Hello</h1>
    },
    {
        path: Path.ANY,
        element: <h1>Any</h1>
    }
])