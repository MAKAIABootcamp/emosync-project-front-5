import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./scheduleAppointment.scss"
import ConfirmAppointment from '../../components/modales/confirmAppointment/ConfirmAppointment'
import { useDispatch, useSelector } from 'react-redux'
import { setModalActive } from '../../store/slides/modals/modals'

const ScheduleAppointment = () => {
    const { modalActive } = useSelector(state => state.modals)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleReturn = () => {
        navigate("/home")
    }

    const onSubmit = (event) => {
        event.preventDefault()
        dispatch(setModalActive())
    }

    return (
        <main className={`schedule-appointment ${modalActive ? "schedule-appointment__fixed" : ""}`}>
            {
                modalActive && (
                    <ConfirmAppointment />
                )
            }
            <figure className='schedule-appointment__return-container' onClick={handleReturn}>
                <img className='schedule-appointment__return-icon' src="/Register/arrow-back.svg" alt="" />
                <figcaption className='schedule-appointment__return-text'>Volver</figcaption>
            </figure>
            <form className='schedule-appointment__form' onSubmit={(event)=> onSubmit(event)}>
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
                            <option value="BRONZE">3 de Octubre</option>
                            <option value="SILVER">4 de Octubre</option>
                            <option value="GOLD">5 de Octubre</option>
                        </select>
                    </label>
                    <label className='schedule-appointment__label'>
                        <p className='schedule-appointment__label--text'>Hora</p>
                        <select className='schedule-appointment__input'>
                            <option value="BRONZE">1:00PM</option>
                            <option value="SILVER">3:00PM</option>
                            <option value="GOLD">4:00PM</option>
                        </select>
                    </label>
                    <label className='schedule-appointment__label'>
                        <p className='schedule-appointment__label--text'>Motivo de consulta</p>
                        <textarea className='schedule-appointment__input'></textarea>
                    </label>
                </div>
                <button className='schedule-appointment__btn-submit'>Agendar</button>
            </form>
        </main>
    )
}

export default ScheduleAppointment