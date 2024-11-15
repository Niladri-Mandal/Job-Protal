import Navbar from '@/components/shared/Navbar'
import React from 'react'


import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
        <Navbar/>
        <Outlet/>
       
    </>
  )
}

export default Layout
