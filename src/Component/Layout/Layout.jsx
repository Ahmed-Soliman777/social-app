import React from 'react'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='bg-zinc-200 min-h-screen'>
      <Navbar />
      <div className="w-3/4 mx-auto my-5">
        <Outlet />
      </div>
    </div>
  )
}
