import React, { useState } from 'react'

const RegisterSelectType = ({setStep}) => {
  const [selected, setSelected] = useState(null)
  
  return (
    <>
      <section className='register__select-container'>
        <h1 className='register__select-title'>Bienvenido a <span>Emosync</span></h1>
        <p className='register__select-text'>¡Nos da gusto que hayas decidido hacer parte de esto!.
          En primera instancia, cuéntanos un poco de ti, ¿Eres?</p>
        <div className='register__type-container'>
          <figure className='register__type-image-container'>
            <img className='register__type-image' src="/Register/client.png" alt="client icon" />
            <figcaption>Paciente</figcaption>
          </figure>
          <figure className='register__type-image-container'>
            <img className='register__type-image' src="/Register/psychologist.png" alt="psychologist icon" />
            <figcaption>Psicólogo</figcaption>
          </figure>
        </div>
        <button className='register__btn-continue'>Continuar</button>
      </section>
    </>
  )
}

export default RegisterSelectType