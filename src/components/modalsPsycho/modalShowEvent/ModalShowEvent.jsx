import React from 'react'
import "./main.scss"


const ModalShowEvent = ({event, close }) => {
    const handleClose = ()=>{
        close(false)
    }
    function formatTime(date) {
        const hours = date.getHours().toString().padStart(2, '0'); // Obtener las horas
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Obtener los minutos
        const seconds = date.getSeconds().toString().padStart(2, '0'); // Obtener los segundos
      
        return `${hours}:${minutes}:${seconds}`;
      }
      const start = formatTime(event.start);
      const end = formatTime(event.end);
  return (
    <section className='modalShowEvent'>
        <section className='modalShowEvent__content'>
           
            <figure onClick={handleClose} className='modalShowEvent__content__closer'><img src="/Psychologist/cross.svg" alt="cross" /></figure>
            <h2 className='modalShowEvent__content__title'>
                Datos de la cita
            </h2>
            <section className='modalShowEvent__content__inf'>
                <section>
                 <h3>Nombre del paciente</h3> 
                 <span>{event.title}</span>
                </section>
                <section>
                 <h3>Hora de inicio</h3> 
                 <span>{start}</span>
                </section>
                <section>
                 <h3>Hora de terminación</h3> 
                 <span>{end}</span>
                </section>
                <section>
                 <h3>Link de la reunión</h3> 
                 <span>{end}</span>
                </section>
                
            </section>
        </section>
    </section>
  )
}

export default ModalShowEvent