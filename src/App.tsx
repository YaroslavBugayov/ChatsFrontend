import { FC, JSX } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom';
import { routerProvider } from './router/router-provider.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

const App: FC = (): JSX.Element => {

    return (
        <>
            <Provider store={store}>
                <RouterProvider router={routerProvider}/>
            </Provider>
        </>
    )
}

export default App
