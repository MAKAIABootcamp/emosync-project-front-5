import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = ({ isAuthenticated }) => {
  return (
    <div>
      {isAuthenticated ? <Navigate to="/" /> : <Outlet />}
    </div>
  )
}

export default PublicRoutes