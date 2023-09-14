import React, { useState } from 'react'
import "./login.scss"
import { useDispatch } from 'react-redux'
import { getUserById, startGoogle } from '../../store/slides/auth/thunk'
import { Link, useNavigate } from 'react-router-dom'
import { authWithGoogle, isLogged, reset } from '../../store/slides/auth/auth'
import Loader from '../../components/loader/Loader'
import { useForm } from 'react-hook-form'
import { loginWithEmailAndPassword } from '../../firebase/providers'
import { login } from '../../store/slides/user/user'

const Login = () => {
  const [checking, setChecking] = useState(false)
  const [googleError, setGoogleError] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const authGoogle = async () => {
    setChecking(true)
    setGoogleError(false)
    setLoginError(false)
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
        setChecking(false)
        handleAuth(resp.key, userData)
      }
    } else {
      setGoogleError(true)
      setChecking(false)
    }
  }

  const loginWithEmail = async (data) => {
    setChecking(true)
    setGoogleError(false)
    setLoginError(false)
    const resp = await loginWithEmailAndPassword(data.email, data.password)
    if (resp.ok) {
      const userData = await getUserById(resp.uid)
      handleAuth(resp.uid, userData)
    } else {
      setChecking(false)
      setLoginError(true)
    }
  }

  const handleAuth = (key, data) => {
    if (data.userRole === "CLIENT") {
      const loginInfo = {
        key,
        appointmentsPerMonth: data.appointmentsPerMonth,
        cardNumber: data.cardNumber,
        displayName: data.displayName,
        loginMethod: data.loginMethod,
        subscription: data.subscription,
        email: data.email
      }
      dispatch(login(loginInfo))
    }
    const authInfo = {
      userRole: data.userRole,
      key
    }

    localStorage.setItem("infoUser", JSON.stringify(authInfo))
    dispatch(isLogged(authInfo))
    navigate("/home")
    setChecking(false)
  }

  return (
    <main className='login'>
      {
        checking && (
          <Loader />
        )
      }
      <article className='login__container'>
        <figure className='login__logo-container'>
          <img className='login__logo' src="/Logo.svg" alt="" />
        </figure>
        <h1 className='login__title'>Iniciar Sesión</h1>
        <p className='login__subtitle'>Encuentra la ayuda que necesitas a un click.</p>
        <form className='login__form' onSubmit={handleSubmit(loginWithEmail)}>
          <div className='login__inputs-continer'>
            <img className='login__icon-form' src="/Login/email.svg" alt="email icon" />
            <input
              className='login__input'
              type="text"
              placeholder='Correo Electrónico'
              {...register("email", { required: true })} />
          </div>
          <div className='login__inputs-continer'>
            <img className='login__icon-form' src="/Login/password.svg" alt="password icon" />
            <input
              className='login__input'
              type="password" placeholder='Contraseña'
              {...register("password", { required: true })} />
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
        {
          googleError && (
            <p className='login__error'>Hubo un error en la auteticación con Google, vuelve a intentarlo</p>
          )
        }
        {
          loginError && (
            <p className='login__error'>Hubo un error al iniciar sesión, vuelve a intentarlo</p>
          )
        }
      </article>
    </main>
  )
}

export default Login