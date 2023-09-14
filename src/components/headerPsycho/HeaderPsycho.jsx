import React, { useEffect } from 'react'
import "./main.scss"
import {useNavigate} from "react-router-dom"
import { useGetUserByIdQuery } from '../../store/api/firebaseApi'
import Loader from '../loader/Loader'
import { useDispatch } from "react-redux"
import { addUserInfo } from '../../store/slides/psychologist/psycho'
import { reset } from '../../store/slides/auth/auth'


const HeaderPsycho = () => {
  const user = JSON.parse(localStorage.getItem('infoUser'));
  const dispatch = useDispatch()
     const {data: userInfo, isSuccess, isLoading} = useGetUserByIdQuery(user.key)


  const navigate = useNavigate()
  const handleCalendar = ()=>{
    navigate("/calendarpsycho")
  }
  const handleHistory = ()=>{
    navigate('/WeekSchedule')
  }
  const toHome = () => {
    navigate('/home')
  }
  const toProfile = () => {
    navigate('/profilePsycho')
  }

useEffect(() => {
  dispatch(addUserInfo(userInfo))
}, [])

const logout = () => {
  dispatch(reset())
  navigate('/')
}


  return (
    <  section className='Header__Psycho'>

    <aside className='headerPsycho '>
        <figure>
            <img src="/Logo.svg" alt="logo" />
        </figure>
        <section className='headerPsycho__middle'>
           <figure onClick={toHome}><img src="/Psychologist/home.svg" alt="home"  className='headerPsycho__middle__active'/></figure>
           <figure onClick={handleCalendar}><img src="/Psychologist/diary.svg" alt="diary" /></figure>
           <figure onClick={handleHistory}><img src="/Psychologist/pending-appointments.svg" alt="pending-appointments" /></figure>
        </section>
        <section className='headerPsycho__end'>
           <figure><img src="/Psychologist/configuration.svg" alt="configuration" /></figure>
           <figure className='headerPsycho__end__logout' onClick={logout}><img src="/Psychologist/logout.svg" alt="logout" /></figure>
        </section>
    </aside>
    <figure>
     { isSuccess ?
     <img src={userInfo.photo} alt="psychologist" onClick={toProfile}/>
    : <Loader/>

    }
    </figure>
    </section>
  )
}

export default HeaderPsycho