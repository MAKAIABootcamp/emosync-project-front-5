import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/landingPage/LandingPage'
import Login from '../pages/login/login'
import Welcome from '../pages/welcome/Welcome';
import Register from '../pages/register/Register';
import RegisterSelectType from '../components/registerSelectType/RegisterSelectType';
import CalendarPsycho from '../pages/psychology/calendar/CalendarPsycho';
import FeedPsycho from '../pages/psychology/feed/FeedPsycho';
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='/register' element={<Register />} />
        <Route path='/RegisterSelectType' element={<RegisterSelectType/>} />
        <Route path='/CalendarPsycho' element={<CalendarPsycho/>} />
        <Route path='/FeedPsycho' element={<FeedPsycho/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router