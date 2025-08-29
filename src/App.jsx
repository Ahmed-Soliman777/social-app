import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from "./Component/Layout/Layout"
import Login from "./Pages/Login/Login"
import Register from './Pages/Register/Register';
import NotFound from './Component/NotFound/NotFound';
import Home from './Pages/Home/Home';
import { Toaster } from 'react-hot-toast';
import PostsDetails from './Pages/PostsDetails/PostsDetails';
import { UserContextProvider } from './Component/context/UserContext';
import Profile from './Component/Profile/Profile';
import EditProfile from './Pages/EditProfile/EditProfile';
import { ProtectedRouting } from './ProtectedRouting/ProtectedRouting';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Offline, Online } from 'react-detect-offline';

export default function App() {
  let Routes = createBrowserRouter([
    {
      path: "/", element: <Layout />, children: [
        { index: true, element: <ProtectedRouting><Home /></ProtectedRouting> },
        { path: "profile", element: <ProtectedRouting><Profile /></ProtectedRouting> },
        { path: "editProfile", element: <ProtectedRouting> <EditProfile /></ProtectedRouting> },
        { path: "postsDetails/:id", element: <ProtectedRouting><PostsDetails /></ProtectedRouting> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ]
    }
  ])

  let queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <RouterProvider router={Routes} />

          <Toaster />
        </UserContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>

      {/* <Online>Online</Online> */}
    </>
  )
}
