import React from 'react'
import "./psychologistCard.scss"
import { useSelector } from 'react-redux'
import PsychologistInfo from '../modales/psychologistInfo/PsychologistInfo'

const PsychologistCard = ({ psychologist: { name, specialty, image } }) => {
  const { psychologistInfoActive } = useSelector(state => state.modals)
  return (
    <div className='psychologist-card'>
      {
        psychologistInfoActive && (
          <PsychologistInfo />
        )
      }
      <figure className='psychologist-card__image-container'>
        <img className='psychologist-card__image' src={image} alt={`${name} image`} />
      </figure>
      <div className='psychologist-card__info-container'>
        <div>
          <h2 className='psychologist-card__name'>{name}</h2>
          <p className='psychologist-card__specialty'>{specialty}</p>
        </div>
        <button className='psychologist-card__info-btn'>Información</button>
      </div>
    </div>
  )
}

export default PsychologistCard