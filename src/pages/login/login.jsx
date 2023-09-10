import React, { useEffect, useState } from 'react'
import "./main.scss"
import iconoApp from '/Logo.svg'
import iconoEmail from '/Login/email.svg'
import iconoPassword from '/Login/password.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Login = () => {
  const { register, handleSubmit, watch, errors, reset } = useForm()
  const watchFields = watch(["emailInput", "passwordInput"])
  const navigate = useNavigate()

  const [activateBtn, setActivateBtn] = useState(false)
  useEffect(() => {
    console.log(watchFields)
    if ((watchFields.length) && (watchFields[0]) && (watchFields[1])) {
      setActivateBtn(true)
    }
  }, [watchFields])

  const toNextPage = () => {
    navigate('/welcome')
  }

  const onSubmit = (data) => {
    console.log(data)
  }


  return (
    <aside className='LoginContainer'>
      <form className="LoginForm" onSubmit={handleSubmit(onSubmit)}>

        <figure className='LoginForm__icon'>
          <img src={iconoApp} alt="icono-app" />
        </figure>

        <h2 className='LoginForm__title' >Iniciar Sesión</h2>

        <span className='LoginForm__text'>Encuentra la ayuda que necesitas a un click</span>

        <div className='LoginForm__box'>
          <figure>
            <img src={iconoEmail} alt="icono-app" />
          </figure>
          <input type="text" placeholder='Correo Electronico' {...register("emailInput")} />
        </div>

        <div className='LoginForm__box'>
          <figure>
            <img src={iconoPassword} alt="icono-app" />
          </figure>
          <input type="password" placeholder='Contraseña' {...register("passwordInput")} />
        </div>

        <div className='LoginForm__method'>
          {activateBtn ?
            (<div className='LoginForm__method__box google'>
              <button type='submit'>Ingresar</button>
            </div>)
            :
            (<div className='LoginForm__method__box ep'>
              <button type='submit'>Ingresar</button>
            </div>)
          }
          <div className='LoginForm__method__box google' onClick={toNextPage}>
            <button> google </button>
          </div>
        </div>

        <span className='LoginForm__register'>¿No tienes cuenta? <Link to={"/register"}>Registrate</Link> </span>

      </form>
    </aside>
  )
}

export default Login