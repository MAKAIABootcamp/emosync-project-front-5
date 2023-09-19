import React from 'react'
import "./psychologistCard.scss"
import { useDispatch } from 'react-redux'
import { setModalActive } from '../../store/slides/modals/modals'

const PsychologistCard = ({ psychologist, setPsychologistInfo }) => {
  const dispatch = useDispatch()

  const showPsychologistInfo = () => {
    dispatch(setModalActive())
    setPsychologistInfo(psychologist)
  }

  return (
    <div className='psychologist-card'>
      <figure className='psychologist-card__image-container'>
        <img className='psychologist-card__image' src={psychologist.photo} alt={`${psychologist.displayName} image`} />
      </figure>
      <div className='psychologist-card__info-container'>
        <div>
          <h2 className='psychologist-card__name'>{psychologist.displayName}</h2>
          <p className='psychologist-card__specialty'>{psychologist.specialty}</p>
        </div>
        <button className='psychologist-card__info-btn' onClick={showPsychologistInfo}>Información</button>
      </div>
    </div>
  )
}

export default PsychologistCard