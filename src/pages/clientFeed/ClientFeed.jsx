import React from 'react'
import "./clientFeed.scss"
import PsychologistCard from '../../components/psychologistCard/PsychologistCard'

const ClientFeed = () => {
  const psicologos = [
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    },
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    },
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    },
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    },
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    },
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    },
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    },
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    },
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    },
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    },
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    },
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    },
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    },
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    },
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    },
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    },
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    },
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    },
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    },
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    },
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    },
    {
      name: "Juliana Sánchez Sáenz ",
      specialty: "Psicologo General",
      image: "https://res.cloudinary.com/dd3qzm4in/image/upload/v1692829468/deliveryApp/client-1.jpg"
    }
  ]
  return (
    <section className='client-feed'>
      <div className='client-feed__search-container'>
        <figure className='client-feed__search-icon-container'>
          <img className='client-feed__search-icon' src="/User/search.svg" alt="" />
        </figure>
        <input className='client-feed__input' type="text" placeholder='Busca aquí por especialidad' />
      </div>
      <div className='client-feed__cards-container'>
        {
          psicologos.map((psychologist, index) => (
            <PsychologistCard key={index + 1} psychologist={psychologist}/>
          ))
        }
      </div>
    </section>
  )
}

export default ClientFeed