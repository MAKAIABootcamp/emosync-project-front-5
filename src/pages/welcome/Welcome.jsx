import React from 'react'
import { useSelector } from 'react-redux'
import "./welcome.scss"
import { Link } from 'react-router-dom'

const Welcome = () => {
  const { userRole } = useSelector(state => state.auth)
  return (
    <main className='welcome'>
      <article className='welcome__container'>
        {
          userRole === "CLIENT" ? (<>
            <h1 className='welcome__title'>¡Bienvenido a Emosync, querido paciente!</h1>
            <p className='welcome__text'>Estamos aquí para apoyarte en tu camino hacia el bienestar emocional.
              Queremos que te sientas cómodo y seguro al buscar la ayuda que necesitas. Por eso, todos nuestros psicólogos
              han sido rigurosamente verificados, garantizando que recibirás atención de alta calidad de profesionales de confianza.
              En nuestra plataforma, tendrás la oportunidad de explorar a los psicólogos disponibles, revisar sus perfiles detallados
              para conocer sus especialidades y enfoques, y, si encuentras al profesional adecuado, podrás agendar una cita de manera
              conveniente. Además, podrás administrar tus citas de forma sencilla, tanto para cancelar las programadas como para reportar
              si una cita es incumplida, lo que nos ayudará a mejorar nuestros servicios. Tu comodidad es esencial para nosotros,
              por lo que también te ofrecemos la opción de editar tu información personal si así lo consideras conveniente.
              Estamos comprometidos en brindarte una experiencia positiva en Emosync y esperamos que encuentres el apoyo que estás
              buscando para tu bienestar emocional.</p>
          </>) : (
            <>
              <h1 className='welcome__title'>¡Bienvenido al emocionante mundo de Emosync, estimado psicólogo!</h1>
              <p className='welcome__text'>Estamos encantados de tenerte a bordo como parte de nuestra creciente comunidad de profesionales
                de la salud mental. En Emosync, te brindamos las herramientas necesarias para que puedas ofrecer tus
                servicios de psicología de manera efectiva y segura. Desde confirmar citas agendadas hasta reportar
                citas incumplidas o finalizadas, pasando por la flexibilidad de administrar tu agenda semanal y editar
                tu perfil de manera sencilla, aquí encontrarás todas las opciones que necesitas para brindar una atención
                de calidad a tus pacientes. Recuerda que la verificación como psicólogo es un paso importante para garantizar
                la confianza de nuestros usuarios, así que no dudes en enviar tu diploma y tarjeta profesional para comenzar
                a ejercer en la plataforma. ¡Estamos emocionados por el impacto positivo que aportarás a la comunidad Emosync!</p>
            </>
          )
        }
        <button className='welcome__btn'>
          <Link to="/home">Comenzar</Link>
        </button>
      </article>
    </main>
  )
}

export default Welcome