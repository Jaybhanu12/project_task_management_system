import React from 'react'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import AdminNavbar from './AdminNavbar'

const Layout2 = () => {
  return (
    <>
    <AdminNavbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout2
