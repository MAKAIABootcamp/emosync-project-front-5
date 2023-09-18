import React from 'react'
import HeaderAdmin from '../../../components/headerAdmin/HeaderAdmin'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <aside>
      <HeaderAdmin />
      <Outlet />
    </aside>
  )
}

export default AdminLayout