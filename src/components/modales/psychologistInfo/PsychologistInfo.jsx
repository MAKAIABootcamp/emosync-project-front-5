import React from 'react'
import "./psychologistInfo.scss"

const PsychologistInfo = () => {
  return (
    <article className='psychologist-info'>
      <section className='psychologist-info__container'>
        <div className='psychologist-info__image-background'>
        </div>
        <img
        className='psychologist-info__image'
        src="https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
        alt="psychologist image" />
      </section>
    </article>
  )
}

export default PsychologistInfo