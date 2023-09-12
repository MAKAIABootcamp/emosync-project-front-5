import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = ({ userRole }) => {
  return (
    <div>
      {userRole ? <Navigate to="/" /> : <Outlet />}
    </div>
  )
}

export default PublicRoutes