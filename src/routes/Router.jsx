import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/landingPage/LandingPage'
import Login from '../pages/login/login'
import Register from '../pages/register/Register'
import { useSelector } from 'react-redux'
import PublicRoutes from './publicRoutes/PublicRoutes'
import ClientFeed from '../pages/clientFeed/ClientFeed'
import ClientProfile from '../pages/clientProfile/ClientProfile'
import FeedPsycho from '../pages/psychology/feed/FeedPsycho'
import ClientLayout from '../pages/clientLayout/ClientLayout'
import PrivateRoutes from './privateRoutes/PrivateRoutes'

const Router = () => {
  const { isAuthenticated, userRole } = useSelector(state => state.auth)

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes isAuthenticated={isAuthenticated} />}>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />}>
          <Route path='/'>
            {
              userRole === "CLIENT" && (
                <Route path='/' element={<ClientLayout />}>
                  <Route path='home' element={<ClientFeed />} />
                  <Route path='profile' element={<ClientProfile />} />
                </Route>
              )
            }
            {
              userRole === "PSYCHOLOGIST" && (
                <Route path='home' element={<FeedPsycho />} />
              )
            }
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router