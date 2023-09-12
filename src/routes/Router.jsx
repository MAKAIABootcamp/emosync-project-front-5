import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/landingPage/LandingPage'
import Login from '../pages/login/login'
import Register from '../pages/register/Register'
import { useSelector } from 'react-redux'
import PublicRoutes from './publicRoutes/PublicRoutes'
import ClientRoutes from './privateRoutes/ClientRoutes'
import ClientFeed from '../pages/clientFeed/ClientFeed'
import ClientProfile from '../pages/clientProfile/ClientProfile'
import PsychologistRoutes from './privateRoutes/PsychologistRoutes'
import FeedPsycho from '../pages/psychology/feed/FeedPsycho'
import ClientLayout from '../pages/clientLayout/ClientLayout'

const Router = () => {
  const { userRole } = useSelector(state => state.auth)
  console.log(userRole)

  return (
    <BrowserRouter>
      <Routes>
          <Route element={<PublicRoutes userRole={userRole} />}>
            <Route path='/home' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
          <Route element={<ClientRoutes userRole={userRole} />}>
            <Route path='/' element={<ClientLayout />}>
              <Route index element={<ClientFeed />}/>
              <Route path='profile' element={<ClientProfile/> }/>
            </Route>
          </Route>
          <Route element={<PsychologistRoutes userRole={userRole} />}>
            <Route path='/' element={<FeedPsycho />}/>
          </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default Router