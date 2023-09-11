import React, { useState } from 'react'
import "./main.scss"
import doctorImage from '/Register/psychologist.png'
import patientImage from '/Register/client.png'
import backArrow from '/Register/arrow-back.svg'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [activateBtn, setActivateBtn] = useState("")
  const clickSelect = (text) => {
    setActivateBtn(text)
  }

  const toNextPage = () => {
    navigate(`${activateBtn}`)
  }

  const toBackPage = () => {
    navigate(-1)
  }
  return (
    <aside className='RegisterContainer'>
      <article className='Register'>
        <section className='Register__welcome'>
          <h2>Bienvenido a <span>EMOSYNC</span></h2>
          <p>¡Nos da gusto que hayas decidido hacer parte de esto!.</p>
          <p>En primera instancia, cuentanos un poco sobre ti, ¿Eres gay?</p>
        </section>
        <section className='Register__select'>
          <div className={activateBtn == "patient" ? ('Register__select__box activated1') : ('Register__select__box')} onClick={() => clickSelect("patient")}>
            <figure>
              <img src={patientImage} alt="paciente" />
            </figure>
            <p>Paciente</p>
          </div>
          <div className={activateBtn == "doctor" ? ('Register__select__box activated1') : ('Register__select__box')} onClick={() => clickSelect("doctor")}>
            <figure>
              <img src={doctorImage} alt="Psicólogo" />
            </figure>
            <p>Psicólogo</p>
          </div>
        </section>
        {
          activateBtn.length ?
            (<span className='Register__next activated2' onClick={toNextPage}>Continuar</span>)
            :
            (<span className='Register__next'>Continuar</span>)
        }
        <figure className='Register__back' onClick={toBackPage}>
          <img src={backArrow} alt="flecha-atras" />
        </figure>
      </article>
    </aside>
  )
}

export default Register