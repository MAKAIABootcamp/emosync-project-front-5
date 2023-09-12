import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PsychologistRoutes = ({ userRole }) => {
  return (
    <div>
      {userRole === "PSYCHOLOGIST" ? <Outlet /> : <Navigate to="/home" />}
    </div>
  )
}

export default PsychologistRoutes