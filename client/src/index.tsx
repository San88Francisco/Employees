import React from 'react'
import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import {store} from './app/store'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import {Paths} from './paths'
import './index.scss'
import Login from './pags/login/login'
import Register from './pags/register/register'

const router = createBrowserRouter([
   {
      path: Paths.home,
      element: <h1>home</h1>,
   },
   {
      path: Paths.login,
      element: <Login />,
   },
   {
      path: Paths.register,
      element: <Register />,
   },
])

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
   <React.StrictMode>
      <Provider store={store}>
         <RouterProvider router={router}></RouterProvider>
      </Provider>
   </React.StrictMode>
)

reportWebVitals()
