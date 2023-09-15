import React from 'react'
import "./psychologistInfo.scss"
import { useDispatch } from 'react-redux'
import { setPsychologistInfoActive } from '../../../store/slides/modals/modals'

const PsychologistInfo = () => {
  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(setPsychologistInfoActive())
  }

  const scheduleAppointmentModal = () => {
    dispatch(setPsychologistInfoActive())
  }

  return (
    <article className='psychologist-info'>
      <section className='psychologist-info__container'>
        <div className='psychologist-info__image-background'>
        </div>
        <img src="/User/close.svg" alt="close con" className='psychologist-info__close-icon' onClick={closeModal}/>
        <img
          className='psychologist-info__image'
          src="https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
          alt="psychologist image" />
        <div className='psychologist-info__info-container'>
          <div>
            <h2 className='psychologist-info__title'>Nombre Completo</h2>
            <p className='psychologist-info__info'>Juliana Sánchez Saenz</p>
          </div>
          <div>
            <h2 className='psychologist-info__title'>Profesión</h2>
            <p className='psychologist-info__info'>Psicóloga general</p>
          </div>
          <div>
            <h2 className='psychologist-info__title'>Un poco sobre Juliana</h2>
            <p className='psychologist-info__info'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium convallis ipsum, eu laoreet magna vestibulum a. Suspendisse lacinia leo id egestas mattis. Suspendisse a purus et velit tempus porta.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium convallis ipsum, eu laoreet magna vestibulum a. Suspendisse lacinia leo id egestas mattis. Suspendisse a purus et velit tempus porta. </p>
          </div>
        </div>
        <button className='psychologist-info__btn' onClick={scheduleAppointmentModal}>Agendar cita</button>
      </section>
    </article>
  )
}

export default PsychologistInfo