import {FC, JSX, useState} from 'react'
import './App.css'
import {RouterProvider} from "react-router-dom";
import {routerProvider} from "./router/router-provider.tsx";

const App: FC = (): JSX.Element => {
  return (
    <>
      <RouterProvider router={routerProvider}/>
    </>
  )
}

export default App
