import React from 'react'
import "./psychologistInfo.scss"
import { useDispatch } from 'react-redux'
import { setModalActive } from '../../../store/slides/modals/modals'
import { useNavigate } from 'react-router-dom'

const PsychologistInfo = ({ psychologistInfo: { displayName, description, specialty, photo, id } }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const closeModal = () => {
    dispatch(setModalActive())
  }

  const scheduleAppointmentModal = () => {
    dispatch(setModalActive())
    navigate(`/schedule-appointment/${id}`)
  }

  const handleDisplayName = () => {
    return displayName.split(" ")[0]
  }

  return (
    <article className='psychologist-info'>
      <section className='psychologist-info__container'>
        <div className='psychologist-info__image-background'>
        </div>
        <img src="/User/close.svg" alt="close con" className='psychologist-info__close-icon' onClick={closeModal} />
        <img
          className='psychologist-info__image'
          src={photo}
          alt="psychologist image" />
        <div className='psychologist-info__info-container'>
          <div>
            <h2 className='psychologist-info__title'>Nombre Completo</h2>
            <p className='psychologist-info__info'>{displayName}</p>
          </div>
          <div>
            <h2 className='psychologist-info__title'>Profesión</h2>
            <p className='psychologist-info__info'>{specialty}</p>
          </div>
          <div>
            <h2 className='psychologist-info__title'>Un poco sobre {handleDisplayName()}</h2>
            <p className='psychologist-info__info'>{
            description === "" ?
            `Actualmente ${handleDisplayName()} no tiene información disponible`
            : description
            
            }</p>
          </div>
        </div>
        <button className='psychologist-info__btn' onClick={scheduleAppointmentModal}>Agendar cita</button>
      </section>
    </article>
  )
}

export default PsychologistInfo