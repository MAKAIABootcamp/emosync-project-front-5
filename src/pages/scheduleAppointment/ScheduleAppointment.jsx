import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./scheduleAppointment.scss"
import ConfirmAppointment from '../../components/modales/confirmAppointment/ConfirmAppointment'

const ScheduleAppointment = () => {
    const navigate = useNavigate()

    const handleReturn = () => {
        navigate("/home")
    }

    return (
        <main className='schedule-appointment'>
            <ConfirmAppointment/>
            <figure className='schedule-appointment__return-container' onClick={handleReturn}>
                <img className='schedule-appointment__return-icon' src="/Register/arrow-back.svg" alt="" />
                <figcaption className='schedule-appointment__return-text'>Volver</figcaption>
            </figure>
            <form className='schedule-appointment__form'>
                <h1 className='schedule-appointment__title'>Agendar Cita</h1>
                <div className='schedule-appointment__form-container'>
                    <label>
                        <h2 className='schedule-appointment__label--text'>Psicólogo</h2>
                        <p className='schedule-appointment__subtitle'>Juliana Sánchez Sáenz</p>
                    </label>
                    <label>
                        <h2 className='schedule-appointment__label--text'>Profesión</h2>
                        <p className='schedule-appointment__subtitle'>Psicóloga General</p>
                    </label>
                    <label className='schedule-appointment__label'>
                        <p className='schedule-appointment__label--text'>Fecha</p>
                        <select className='schedule-appointment__input'>
                            <option value="BRONZE">Bronce</option>
                            <option value="SILVER">Plata</option>
                            <option value="GOLD">Oro</option>
                        </select>
                    </label>
                    <label className='schedule-appointment__label'>
                        <p className='schedule-appointment__label--text'>Hora</p>
                        <select className='schedule-appointment__input'>
                            <option value="BRONZE">Bronce</option>
                            <option value="SILVER">Plata</option>
                            <option value="GOLD">Oro</option>
                        </select>
                    </label>
                    <label className='schedule-appointment__label'>
                        <p className='schedule-appointment__label--text'>Motivo de consulta</p>
                        <textarea className='schedule-appointment__input'></textarea>
                    </label>
                </div>
                <button className='schedule-appointment__btn-submit'>Guardar Cambios</button>
            </form>
        </main>
    )
}

export default ScheduleAppointment