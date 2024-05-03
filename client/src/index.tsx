import React from 'react'
import { ConfigProvider, theme } from 'antd'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import { Paths } from './paths'
import './index.scss'
import Login from './pags/login/login'
import Register from './pags/register/register'
import Auth from './features/auth/auth'
import Employees from './pags/employees/employees'
import AddEmployee from './pags/add-employee/add-employee'
import Status from './pags/status/status'
import Employee from './pags/employee/employee'
import EditEmployee from './pags/edit-employee/edit-employee'

//router
//router
const router = createBrowserRouter([
   {
      path: Paths.home,
      element: <Employees />,
   },
   {
      path: Paths.login,
      element: <Login />,
   },
   {
      path: Paths.register,
      element: <Register />,
   },
   {
      path: Paths.employeeAdd,
      element: <AddEmployee />,
   },
   {
      path: `${Paths.status}/:status`,
      element: <Status />,
   },
   {
      path: `${Paths.employee}/:id`,
      element: <Employee />,
   },
   {
      path: `${Paths.employeeEdit}/:id`,
      element: <EditEmployee />,
   },
])

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
   <React.StrictMode>
      <Provider store={store}>
         <ConfigProvider
            theme={{
               algorithm: theme.darkAlgorithm,
            }}
         >
            <Auth>
               <RouterProvider router={router}></RouterProvider>
            </Auth>
         </ConfigProvider>
      </Provider>
   </React.StrictMode>
)

reportWebVitals()
