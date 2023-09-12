import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ClientRoutes = ({ userRole }) => {
  return (
    <div>
      {userRole === "CLIENT" ? <Outlet /> : <Navigate to="/" />}
    </div>
  )
}

export default ClientRoutes