import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = ({ isAuthenticated }) => {
    return (
        <div>
            {isAuthenticated ? <Outlet /> : <Navigate to="/home" />}
        </div>
    )
}

export default PrivateRoutes