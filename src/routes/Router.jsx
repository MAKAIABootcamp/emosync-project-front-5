import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/landingPage/LandingPage'


const Router = () => {
  return (
   <BrowserRouter>
        <Routes>
            <Route path='/' element={<LandingPage/>}>
            </Route>
        </Routes>
   </BrowserRouter>
  )
}

export default Router