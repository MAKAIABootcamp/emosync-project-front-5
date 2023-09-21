import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./scheduleAppointment.scss"
import ConfirmAppointment from '../../components/modales/confirmAppointment/ConfirmAppointment'
import { useDispatch, useSelector } from 'react-redux'
import { setModalActive } from '../../store/slides/modals/modals'
import { getPsychologist } from '../../services/getPsychologist'
import { useForm } from 'react-hook-form'

const ScheduleAppointment = () => {
    const { modalActive } = useSelector(state => state.modals)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { psychologistId } = useParams()
    const [psychologist, setPsychologist] = useState()
    const { register, handleSubmit, formState: { errors }, watch } = useForm()

    useEffect(() => {
        getData()
    }, [])

    const handleReturn = () => {
        navigate("/home")
    }

    const onSubmit = (data) => {
        if (psychologist.stripe.length > 0) {
            dispatch(setModalActive())
        }
    }

    const getData = async () => {
        const { data } = await getPsychologist(psychologistId)
        setPsychologist(data)
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
            {
                psychologist?.displayName && (
                    <form className='schedule-appointment__form' onSubmit={handleSubmit(onSubmit)}>
                        <h1 className='schedule-appointment__title'>Agendar Cita</h1>
                        <div className='schedule-appointment__form-container'>
                            <label>
                                <h2 className='schedule-appointment__label--text'>Psicólogo</h2>
                                <p className='schedule-appointment__subtitle'>{psychologist.displayName}</p>
                            </label>
                            <label>
                                <h2 className='schedule-appointment__label--text'>Profesión</h2>
                                <p className='schedule-appointment__subtitle'>
                                    {psychologist.verifiedSpecialty ? psychologist.specialty : "Psicólog@ general"}
                                </p>
                            </label>
                            {
                                psychologist.stripe.length > 0 ? (
                                    <>
                                        <label className='schedule-appointment__label'>
                                            <p className='schedule-appointment__label--text'>Fecha</p>
                                            <input
                                                type="date"
                                                min={new Date().toISOString().slice(0, -8).split('T')[0]}
                                                className='schedule-appointment__input  datepickerbg'
                                                {...register("date")}
                                            />
                                        </label>
                                        {
                                            watch("date") && (
                                                <>
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
                                                </>
                                            )
                                        }
                                    </>
                                ) : (
                                    <p className='schedule-appointment__label--text'>El psicólogo no tiene horarios disponibles en este momento</p>
                                )
                            }
                        </div>
                        {
                            psychologist.stripe.length > 0 && (
                                <button className='schedule-appointment__btn-submit' >Agendar</button>
                            )
                        }
                    </form>
                )
            }
        </main>
    )
}

export default ScheduleAppointment