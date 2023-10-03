import React from 'react'
import './headerAdmin.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reset } from '../../store/slides/auth/auth'

const HeaderAdmin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const toNavi = (text) => {
    navigate(`/${text}`)
  }

  const toExit = () => {
    dispatch(reset())
    //dispatch(logout())
    navigate('/')
  }

  return (
    <header className='HeaderAdminContainer'>
      <nav className='HeaderAdmin__nav'>
        <figure className='HeaderAdmin__nav__btn fig1' onClick={toExit}>
          <img src="/Admin/logout.svg" alt="logo" />
        </figure>
        <figure className='HeaderAdmin__nav__btn fig2' onClick={() => toNavi('home')}>
          <img src="/Admin/home.svg" alt="logo" />
        </figure>
        <figure className='HeaderAdmin__nav__btn fig3' onClick={() => toNavi('config')}>
          <img src="/Admin/configuration.svg" alt="logo" />
        </figure>
      </nav>

      <figure className='HeaderAdmin__logo'>
        <img src="/Admin/adminLogo.svg" alt="logo" />
      </figure>
    </header>
  )
}

export default HeaderAdmin