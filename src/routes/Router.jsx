import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/landingPage/LandingPage'
import Login from '../pages/login/login'
import Register from '../pages/register/Register'
import { useDispatch, useSelector } from 'react-redux'
import PublicRoutes from './publicRoutes/PublicRoutes'
import ClientFeed from '../pages/clientFeed/ClientFeed'
import ClientProfile from '../pages/clientProfile/ClientProfile'
import FeedPsycho from '../pages/psychology/feed/FeedPsycho'
import ClientLayout from '../pages/clientLayout/ClientLayout'
import PrivateRoutes from './privateRoutes/PrivateRoutes'
import { isLogged } from '../store/slides/auth/auth'
import Welcome from '../pages/welcome/Welcome'

const Router = () => {
  const { isAuthenticated, userRole } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    validateAuth()
  }, [])

  const validateAuth = () => {
    const infoUser = JSON.parse(localStorage.getItem("infoUser"))
    infoUser?.userRole && dispatch(isLogged(infoUser))
  }

  return (
    <BrowserRouter>
      {
          <Routes>
            <Route element={<PublicRoutes isAuthenticated={isAuthenticated} />}>
              <Route path='/'>
                <Route index element={<LandingPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
              </Route>
            </Route>
            <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
              {
                userRole === "CLIENT" && (
                  <>
                    <Route path='/welcome' element={<Welcome />} />
                    <Route path='/' element={<ClientLayout />}>
                      <Route path='home' element={<ClientFeed />} />
                      <Route path='profile' element={<ClientProfile />} />
                    </Route>
                  </>
                )
              }
              {
                userRole === "PSYCHOLOGIST" && (
                  <>
                    <Route path='/welcome' element={<Welcome />} />
                    <Route path='/'>
                      <Route path='home' element={<FeedPsycho />} />
                    </Route>
                  </>
                )
              }
            </Route>
          </Routes>
      }

    </BrowserRouter>
  )
}

export default Router