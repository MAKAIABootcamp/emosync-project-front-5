import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/landingPage/LandingPage'
import FeedPsycho from '../pages/psychology/feed/FeedPsycho'
import WeekSchedule from '../pages/psychology/weekSchedule/WeekSchedule'
import HistoryPsycho from '../pages/psychology/history/HistoryPsycho'
import NewSchedule from '../pages/psychology/newSchedule/NewSchedule'
import ProfilePsycho from '../pages/psychology/profilePsycho/ProfilePsycho'


const Router = () => {
  return (
   <BrowserRouter>
        <Routes>
            <Route path='/' element={<ProfilePsycho/>}>
            </Route>
        </Routes>
   </BrowserRouter>
  )
}

export default Router