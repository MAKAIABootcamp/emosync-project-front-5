import React from 'react'
import "./main.scss"
const ModalAppointInfo = ({appoint, close }) => {
  const handleClose = ()=>{
    close(false)
}

  return (
    <section className='modalShowPending'>
        <section className='modalShowPending__content'>
           
            <figure onClick={handleClose} className='modalShowPending__content__closer'><img src="/Psychologist/cross.svg" alt="cross" /></figure>
            <h2 className='modalShowPending__content__title'>
                Datos de la cita
            </h2>
            <section className='modalShowPending__content__inf'>
                <section>
                 <h3>Nombre del paciente</h3> 
                 <span>{appoint.clientName}</span>
                </section>
                <section>
                 <h3>Motivo de consulta</h3> 
                 <span>{appoint.consultationReason}</span>
                </section>
                <section>
                 <h3>Fecha de la cita</h3> 
                 <span>{appoint.time}</span>
                </section>
            </section>
        </section>
    </section>
  )
}

export default ModalAppointInfo