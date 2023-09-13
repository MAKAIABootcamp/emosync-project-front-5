import React from 'react'
import { useSelector } from 'react-redux'

const Welcome = () => {
  const {userRole} = useSelector(state => state.auth)
  return (
    <div>{userRole === "CLIENT" ? "CLIENT" : "PSCIOLOGO"}</div>
  )
}

export default Welcome