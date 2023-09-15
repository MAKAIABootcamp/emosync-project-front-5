import React from 'react'
import "./psychologistInfo.scss"

const PsychologistInfo = () => {
  return (
    <article className='psychologist-info'>
      <section className='psychologist-info__container'>
        <div className='psychologist-info__image-background'>
        </div>
        <img src="/User/close.svg" alt="close con" className='psychologist-info__close-icon' />
        <img
          className='psychologist-info__image'
          src="https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
          alt="psychologist image" />
        <div className='psychologist-info__info-container'>
          <div>
            <h2>Nombre Completo</h2>
            <p>Juliana Sánchez Saenz</p>
          </div>
          <div>
            <h2>Profesión</h2>
            <p>Psicóloga general</p>
          </div>
          <div>
            <h2>Un poco sobre Juliana</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium convallis ipsum, eu laoreet magna vestibulum a. Suspendisse lacinia leo id egestas mattis. Suspendisse a purus et velit tempus porta.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium convallis ipsum, eu laoreet magna vestibulum a. Suspendisse lacinia leo id egestas mattis. Suspendisse a purus et velit tempus porta. </p>
          </div>
        </div>
        <button>Agendar cita</button>
      </section>
    </article>
  )
}

export default PsychologistInfo