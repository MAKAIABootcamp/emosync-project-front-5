import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserRole } from '../../store/slides/auth/auth'

const RegisterSelectType = ({ setStep }) => {
  const { userRole } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleUserRole = (role) => {
    dispatch(setUserRole(role))
  }

  const handleStep = () => {
    if(userRole) {
      setStep(2)
    }
  }

  return (
    <>
      <section className='register__select-container'>
        <h1 className='register__select-title'>Bienvenido a <span>Emosync</span></h1>
        <p className='register__select-text'>¡Nos da gusto que hayas decidido hacer parte de esto!.
          En primera instancia, cuéntanos un poco de ti, ¿Eres?</p>
        <div className='register__type-container'>
          <figure
            className={`register__type-image-container ${userRole === "CLIENT" ? "register__selected" : ""}`}
            onClick={() => handleUserRole("CLIENT")}>
            <img className='register__type-image' src="/Register/client.png" alt="client icon" />
            <figcaption>Paciente</figcaption>
          </figure>
          <figure
            className={`register__type-image-container ${userRole === "PSYCHOLOGIST" ? "register__selected" : ""}`}
            onClick={() => handleUserRole("PSYCHOLOGIST")}>
            <img className='register__type-image' src="/Register/psychologist.png" alt="psychologist icon" />
            <figcaption>Psicólogo</figcaption>
          </figure>
        </div>
        <button
        className={`register__btn-continue ${!userRole ? "register__inactive-btn" : ""}`}
        onClick={handleStep}
        >Continuar</button>
      </section>
    </>
  )
}

export default RegisterSelectType