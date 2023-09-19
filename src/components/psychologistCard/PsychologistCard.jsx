import React from 'react'
import "./psychologistCard.scss"
import { useDispatch } from 'react-redux'
import { setModalActive } from '../../store/slides/modals/modals'

const PsychologistCard = ({ psychologist: { displayName, specialty, photo } }) => {
  const dispatch = useDispatch()

  const showPsychologistInfo = () => {
    dispatch(setModalActive())
  }

  return (
    <div className='psychologist-card'>
      <figure className='psychologist-card__image-container'>
        <img className='psychologist-card__image' src={photo} alt={`${displayName} image`} />
      </figure>
      <div className='psychologist-card__info-container'>
        <div>
          <h2 className='psychologist-card__name'>{displayName}</h2>
          <p className='psychologist-card__specialty'>{specialty}</p>
        </div>
        <button className='psychologist-card__info-btn' onClick={showPsychologistInfo}>Información</button>
      </div>
    </div>
  )
}

export default PsychologistCard