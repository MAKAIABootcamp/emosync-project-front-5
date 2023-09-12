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
  const { authenticated } = useSelector(state => state.auth)
  console.log(authenticated)

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes authenticated={authenticated} />}>
          <Route path='/home' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route element={<PrivateRoutes authenticated={authenticated} />}>
          {
            authenticated === "CLIENT" && (
              <Route path='/' element={<ClientLayout />}>
                <Route index element={<ClientFeed />} />
                <Route path='profile' element={<ClientProfile />} />
              </Route>
            )
          }
          {
            authenticated === "PSYCHOLOGIST" && (
              <Route path='/' element={<FeedPsycho />} />
            )
          }
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router