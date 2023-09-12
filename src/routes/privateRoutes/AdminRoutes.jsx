import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes = ({ userRole }) => {
  return (
    <div>
      {userRole === "ADMIN" ? <Outlet /> : <Navigate to="/home" />}
    </div>
  )
}

export default AdminRoutes