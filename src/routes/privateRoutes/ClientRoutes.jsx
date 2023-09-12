import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ClientRoutes = ({ authenticated }) => {
    console.log('client routes, authenticated')
    return (
        <div>
            {authenticated ? <Outlet /> : <Navigate to="/home" />}
        </div>
    )
}

export default ClientRoutes