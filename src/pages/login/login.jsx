import React, { useState } from 'react'
import "./login.scss"
import { useDispatch } from 'react-redux'
import { getUserById, startGoogle } from '../../store/slides/auth/thunk'
import { Link, useNavigate } from 'react-router-dom'
import { authWithGoogle, isLogged, reset } from '../../store/slides/auth/auth'
import Loader from '../../components/loader/Loader'

const Login = () => {
  const [checkingGoogle, setCheckingGoogle] = useState(false)
  const [googleError, setGoogleError] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authGoogle = async () => {
    setCheckingGoogle(true)
    setGoogleError(false)
    setLoginError(false)
    dispatch(reset())
    const resp = await dispatch(startGoogle())
    if (resp?.ok) {
      const userData = await getUserById(resp.key)
      if (!userData) {
        const dataAuth = {
          email: resp.email,
          displayName: resp.displayName,
          key: resp.key
        }
        dispatch(authWithGoogle(dataAuth))
        navigate("/register")
      } else {
        const loginInfo = {
          userRole: userData.userRole,
          key: resp.key
        }
        setCheckingGoogle(false)
        localStorage.setItem("infoUser", JSON.stringify(loginInfo))
        dispatch(isLogged(loginInfo))
        navigate("/home")
      }
    } else {
      setGoogleError(true)
      setCheckingGoogle(false)
    }
  }

  return (
    <main className='login'>
      {
        checkingGoogle && (
          <Loader />
        )
      }
      <article className='login__container'>
        <figure className='login__logo-container'>
          <img className='login__logo' src="/Logo.svg" alt="" />
        </figure>
        <h1 className='login__title'>Iniciar Sesión</h1>
        <p className='login__subtitle'>Encuentra la ayuda que necesitas a un click.</p>
        <form className='login__form'>
          <div className='login__inputs-continer'>
            <img className='login__icon-form' src="/Login/email.svg" alt="email icon" />
            <input className='login__input' type="text" placeholder='Correo Electrónico' />
          </div>
          <div className='login__inputs-continer'>
            <img className='login__icon-form' src="/Login/password.svg" alt="password icon" />
            <input className='login__input' type="text" placeholder='Contraseña' />
            <p>Recuperar Contraseña</p>
          </div>
          <div className='login__btn-container'>
            <button type='submit' className='login__btn-login'>Ingresar</button>
            <button type='button' className='login__btn-google' onClick={authGoogle}>
              <img className='login__google-icon' src="/Login/google-icon.svg" alt="" />
              <p>Goolge</p>
            </button>
          </div>
        </form>
        <p className='login__register'>¿No tienes cuenta? <Link to="/register">Registrate</Link></p>
      </article>
    </main>
  )
}

export default Login