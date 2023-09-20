import React, { useEffect, useState } from 'react'
import "./clientFeed.scss"
import PsychologistCard from '../../components/psychologistCard/PsychologistCard'
import { useSelector } from 'react-redux'
import PsychologistInfo from '../../components/modales/psychologistInfo/PsychologistInfo'
import { getPsychologists } from '../../services/getPsychologists'
import EmptyState from '../../components/emptyState/EmptyState'

const ClientFeed = () => {
  const { modalActive } = useSelector(state => state.modals)
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
  const [psychologists, setPsychologists] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [psychologistInfo, setPsychologistInfo] = useState({})

  useEffect(() => {
    validateData()
  }, [])

  const validateData = async () => {
    const { data } = await getPsychologists()
    const aux = data;
    aux.forEach((item) => item.specialty = !item.verifiedSpecialty ? "Psicólog@ General" : item.specialty)
    setPsychologists(aux)
    setFilteredData(aux)
  }

  const filterBySpecialty = (event) => {
    if (event.key === 'Enter') {
      if (event.target.value) {
        const dataFiltered = psychologists.filter((item) => item.specialty.toLowerCase().includes(event.target.value.toLowerCase()))
        setFilteredData([...dataFiltered])
      } else {
        setFilteredData([...psychologists])
      }
    }
  }

  return (
    <section className='client-feed'>
      {
        modalActive && (
          <PsychologistInfo psychologistInfo={psychologistInfo} />
        )
      }
      <div className='client-feed__search-container'>
        <figure className='client-feed__search-icon-container'>
          <img className='client-feed__search-icon' src="/User/search.svg" alt="" />
        </figure>
        <input
          className='client-feed__input'
          type="text"
          placeholder='Busca aquí por especialidad'
          onKeyDown={(event) => filterBySpecialty(event)} />
      </div>
      <div className='client-feed__cards-container'>
        {
          filteredData.length > 0 && filteredData.map((psychologist, index) => (
            <PsychologistCard key={index + 1} psychologist={psychologist} setPsychologistInfo={setPsychologistInfo} />
          ))
        }
      </div>
      {
        filteredData <= 0 && (
          <EmptyState type={"SEARCH"} />
        )
      }
    </section>
  )
}

export default ClientFeed