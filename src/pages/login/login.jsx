import React from 'react'
import "./login.scss"

const Login = () => {
  return (
    <main className='login'>
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
            <button type='button' className='login__btn-google'>
              <img className='login__google-icon' src="/Login/google-icon.svg" alt="" />
              <p>Goolge</p>
            </button>
          </div>
        </form>
        <p className='login__register'>¿No tienes cuenta? <span>Registrate</span></p>
      </article>
    </main>
  )
}

export default Login