import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from '../pages/landingPage/LandingPage'
import Login from '../pages/login/login'
import Register from '../pages/register/Register'
import { useSelector } from 'react-redux'
import PublicRoutes from './publicRoutes/PublicRoutes'
import ClientRoutes from './privateRoutes/ClientRoutes'
import LayoutClient from '../pages/layoutClient/LayoutClient'
import ClientFeed from '../pages/clientFeed/ClientFeed'
import ClientProfile from '../pages/clientProfile/ClientProfile'

const Router = () => {
  const { userRole } = useSelector(state => state.auth)
  console.log(userRole)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route element={<PublicRoutes userRole={userRole} />}>
            <Route index element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
          <Route element={<ClientRoutes userRole={userRole} />}>
            <Route path='/' element={<LayoutClient />}>
              <Route path='psychologists' element={<ClientFeed />}/>
              <Route path='profile' element={<ClientProfile/> }/>
            </Route>
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default Router