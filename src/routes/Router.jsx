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
import { getUserById } from '../store/slides/auth/thunk'
import { login } from '../store/slides/user/user'
import CalendarPsycho from '../pages/psychology/calendar/CalendarPsycho'
import HistoryPsycho from '../pages/psychology/history/HistoryPsycho'
import WeekSchedule from '../pages/psychology/weekSchedule/WeekSchedule'
import ProfilePsycho from '../pages/psychology/profilePsycho/ProfilePsycho'
import EditProfileClient from '../pages/editProfileClient/EditProfileClient'


const Router = () => {
  const { isAuthenticated, userRole } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    validateAuth()
  }, [])

  const validateAuth = async () => {
    const infoUser = JSON.parse(localStorage.getItem("infoUser"))
    if (infoUser?.userRole && !isAuthenticated) {
      dispatch(isLogged(infoUser))
      if (infoUser.userRole === "CLIENT") {
        const data = await getUserById(infoUser.key)
        const loginInfo = {
          key: infoUser.key,
          appointmentsPerMonth: data.appointmentsPerMonth,
          cardNumber: data.cardNumber,
          displayName: data.displayName,
          loginMethod: data.loginMethod,
          subscription: data.subscription,
          email: data.email
        }
        dispatch(login(loginInfo))
      }
    }
    setIsAuth(true)
  }

  return (
    <BrowserRouter>
      {isAuth && (
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
                    <Route path='edit-profile' element={<EditProfileClient />} />
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
                  <Route path='/calendarpsycho' element={<CalendarPsycho />} />
                  <Route path='/WeekSchedule' element={<WeekSchedule />} />
                  <Route path='/history' element={<HistoryPsycho />} />
                  <Route path='/profilePsycho' element={<ProfilePsycho />} />
                </>
              )
            }
            {
              userRole === "ADMIN" && (
                <>
                  <Route path='/'>
                    <Route path='home' />
                  </Route>
                </>
              )
            }
          </Route>
        </Routes>
      )

      }
    </BrowserRouter>
  )
}

export default Router