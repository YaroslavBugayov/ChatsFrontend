import { FC, JSX, useState } from 'react'
import './App.css'
import { Router, RouterProvider } from 'react-router-dom';
import { routerProvider } from "./router/router-provider.tsx";
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './app/store.ts';
import { Navbar } from './components/navbar/navbar.tsx';

const App: FC = (): JSX.Element => {
  return (
    <>
        <Provider store={ store }>
            <Toaster />
            <RouterProvider router={routerProvider} />
        </Provider>
    </>
  )
}

export default App
