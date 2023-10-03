import React from 'react'
import "./main.scss"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reset } from '../../store/slides/auth/auth'

const LandingPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const toLogin = () => {
    navigate('/login')
  }
  const toRegister = () => {
    dispatch(reset())
    navigate('/register')
  }
  return (
    <section className='landingPage'>
      <header className='landingPage__header'>
        <figure className='landingPage__header__banner'><img src="/Aboutus/banner.svg" alt="banner" /></figure>
        <nav className='landingPage__header__nav'>
          <figure><img src="/WhiteLogo.svg" alt="logo" /></figure>
          <section  className='landingPage__header__nav__buttons'>
          <button className='landingPage__header__nav__button1' onClick={toLogin}>Entrar</button>
          <button className='landingPage__header__nav__button2' onClick={toRegister}>Registrarse</button>
          </section>
        </nav>
        <button className='landingPage__header__start' onClick={toRegister}>Comienza Aqui</button>
      </header>
      <main className='landingPage__body'>
        <section className='landingPage__body__first'>
          <p>Regístrate hoy y empieza tus asesorías psicológicas con Emosync</p>
          <section className='landingPage__body__first__squares'>
            <article>
              <figure><img src="/Aboutus/accessibility.svg" alt="accessibility" /></figure>
              <h3>Accesible</h3>
              <p>Accesible para todo público. De forma remota y en los horarios que tú escojas.</p>
            </article>
            <article>
              <figure><img src="/Aboutus/where-to-start.svg" alt="where-to-start" /></figure>
              <h3>¿No sabes dónde empezar?</h3>
              <p>Tenemos disponibles una gran variedad de psicólogos para tu comodidad. ¡Toma tu primera asesoría con el que más te guste!</p>
            </article>
            <article>
              <figure><img src="/Aboutus/economic.svg" alt="economic" /></figure>
              <h3>Económico</h3>
              <p>Ofrecemos diferentes planes y servicios acorde a tus necesidades y comodidades.</p>
            </article>
            <article>
              <figure><img src="/Aboutus/friendly.svg" alt="friendly" /></figure>
              <h3>Amigable</h3>
              <p>Somos una plataforma amigable donde te sentirás cómodo, tranquilo y seguro.</p>
            </article>
          </section>
        </section>
        <section className='landingPage__body__middle'>
          <p>¡Estos son nuestros planes!
            <br />
            Busca el que se adapte mejor a tu bolsillo y empieza hoy a <br /> cuidar de ti.
          </p>
        </section>
        <section className='landingPage__body__plans'>
          <article className='landingPage__body__plans__plan'>
            <figure><img src="/Aboutus/bronze.svg" alt="medallion" /></figure>
            <h2>Bronce</h2>
            <section className='landingPage__body__plans__plan__benefits'>
              <div>
                <figure><img src="/Aboutus/check.svg" alt="check" /></figure>
                <p>3 citas con psicólogo general al mes, después tendrán un costo de 36,000 COP</p>
              </div>
              <div>
                <figure><img src="/Aboutus/check.svg" alt="check" /></figure>
                <p>Cada cita con especialista tendrá un costo de 90,000 COP</p>
              </div>
            </section>
            <section className='landingPage__body__plans__plan__price'>
              <p>Precio de suscripción mensual</p>
              <h2>100,000 COP</h2>
            </section>
          </article>
          <article className='landingPage__body__plans__plan'>
            <figure><img src="/Aboutus/silver.svg" alt="medallion" /></figure>
            <h2>Plata</h2>
            <section className='landingPage__body__plans__plan__benefits'>
              <div>
                <figure><img src="/Aboutus/check.svg" alt="check" /></figure>
                <p>5 citas con psicólogo general al mes, después tendrán un costo de 33,000 COP</p>
              </div>
              <div>
                <figure><img src="/Aboutus/check.svg" alt="check" /></figure>
                <p>Cada cita con especialista tendrá un costo de 80,000 COP</p>
              </div>
            </section>
            <section className='landingPage__body__plans__plan__price'>
              <p>Precio de suscripción mensual</p>
              <h2>150,000 COP</h2>
            </section>
          </article>
          <article className='landingPage__body__plans__plan'>
            <figure><img src="/Aboutus/gold.svg" alt="medallion" /></figure>
            <h2>Oro</h2>
            <section className='landingPage__body__plans__plan__benefits'>
              <div>
                <figure><img src="/Aboutus/check.svg" alt="check" /></figure>
                <p>7 citas con psicólogo general al mes, después tendrán un costo de 30,000 COP</p>
              </div>
              <div>
                <figure><img src="/Aboutus/check.svg" alt="check" /></figure>
                <p>2 citas con especialistas después tendrán un costo de 65,000 COP</p>
              </div>
            </section>
            <section className='landingPage__body__plans__plan__price'>
              <p>Precio de suscripción mensual</p>
              <h2>210,000 COP</h2>
            </section>
          </article>
        </section>
        <section className='landingPage__body__emptyBackground1'></section>
        <section className='landingPage__body__emptyBackground2'></section>
      </main>
    </section>
  )
}

export default LandingPage