import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = ({ authenticated }) => {
  return (
    <div>
      {authenticated ? <Navigate to="/" /> : <Outlet />}
    </div>
  )
}

export default PublicRoutes