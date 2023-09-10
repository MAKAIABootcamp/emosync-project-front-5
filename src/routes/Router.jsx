import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/landingPage/LandingPage'
import Login from '../pages/login/login'
import Welcome from '../pages/welcome/Welcome'
import Register from '../pages/register/Register'
import RegisterExtend from '../pages/register/RegisterExtend'


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register/:userType' element={<RegisterExtend />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router