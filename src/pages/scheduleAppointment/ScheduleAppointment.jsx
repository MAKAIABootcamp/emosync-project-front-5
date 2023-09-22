import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./scheduleAppointment.scss"
import ConfirmAppointment from '../../components/modales/confirmAppointment/ConfirmAppointment'
import { useDispatch, useSelector } from 'react-redux'
import { setModalActive } from '../../store/slides/modals/modals'
import { getPsychologist } from '../../services/getPsychologist'
import { getHours } from '../../services/printDate'
import { getAppointmentsPsicologists } from '../../services/getAppointmentsClient'

const ScheduleAppointment = () => {
    const { modalActive } = useSelector(state => state.modals)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { psychologistId } = useParams()
    const [psychologist, setPsychologist] = useState({})
    const [dateSelected, setDateSelected] = useState("")
    const [availableDay, setAvailableDay] = useState(false)
    const [availableHours, setAvailableHours] = useState([])
    const [selectedHour, setSelectedHour] = useState("")
    const [reason, setReason] = useState("")
    const propsConfirmAppointment = {
        date:selectedHour,
        reason,
        psychologist,
        psychologistId
    }
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const { data } = await getPsychologist(psychologistId)
        data.stripe.forEach((element) => {
            element.day = setDays(element.day)
        })
        setPsychologist(data)
    }

    const handleReturn = () => {
        navigate("/home")
    }

    const onSubmit = (event) => {
        event.preventDefault()
        if (psychologist.stripe.length > 0) {
            dispatch(setModalActive())
        }
    }

    const handleDate = async (date) => {
        setDateSelected(date)
        const [year, month, day] = date.split("-")
        const selectedDate = new Date().setFullYear(year, month - 1, day)
        const selectedDay = new Date(selectedDate).getDay()
        const selectedDayValidate = psychologist.stripe.some(element => element.day === selectedDay)
        setAvailableDay(selectedDayValidate)
        if (selectedDayValidate) {
            const findDay = psychologist.stripe.find(element => element.day === selectedDay)
            const startHour = new Date(selectedDate).setHours(Number(findDay.start), 0, 0, 0)
            const endHour = new Date(selectedDate).setHours(Number(findDay.end), 0, 0, 0)
            const { data } = await getAppointmentsPsicologists(psychologistId, startHour, endHour)
            let hoursAux = [];
            let currentHour = startHour;

            while (currentHour <= endHour) {
                const hour = new Date(currentHour).getTime();
                hoursAux.push(hour);
                currentHour += 60 * 60 * 1000; // Agregar 1 hora (en milisegundos)
            }
            let availableHours = hoursAux;

            if (data.length > 0) {
                let aux = []

                data.forEach(appointment => {
                    aux.push(appointment.appointmentDate)
                })

                availableHours = hoursAux.filter(hour => hour !== aux.find(item => hour === item))
            }

            setAvailableHours(availableHours)
        }
    }

    const setDays = (day) => {
        switch (day) {
            case "lunes": return 1
            case "martes": return 2
            case "miercoles": return 3
            case "jueves": return 4
            case "viernes": return 5
            case "sabado": return 6
            case "domingo": return 0
            default: return ""
        }
    }

    return (
        <main className={`schedule-appointment ${modalActive ? "schedule-appointment__fixed" : ""}`}>
            {
                modalActive && (
                    <ConfirmAppointment props={propsConfirmAppointment}/>
                )
            }
            <figure className='schedule-appointment__return-container' onClick={handleReturn}>
                <img className='schedule-appointment__return-icon' src="/Register/arrow-back.svg" alt="" />
                <figcaption className='schedule-appointment__return-text'>Volver</figcaption>
            </figure>
            {
                psychologist?.displayName && (
                    <form className='schedule-appointment__form' onSubmit={(event) => onSubmit(event)}>
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
                                                onChange={(event) => handleDate(event.target.value)}
                                            />
                                        </label>
                                        {
                                            dateSelected && availableDay && (
                                                <>
                                                    <label className='schedule-appointment__label'>
                                                        <p className='schedule-appointment__label--text'>Hora</p>
                                                        <select
                                                            className='schedule-appointment__input'
                                                            onChange={(event) => setSelectedHour(event.target.value)}
                                                        >
                                                            <option value="">Elige una hora</option>
                                                            {
                                                                availableHours.length > 0 && availableHours.map((hour, index) => (
                                                                    <option value={hour} key={index + 1}>
                                                                        {`${getHours(new Date(hour).getHours())}:00${new Date(hour).getHours() < 12 ? "AM" : "PM"}`}
                                                                    </option>
                                                                ))
                                                            }
                                                        </select>
                                                    </label>
                                                    <label className='schedule-appointment__label'>
                                                        <p className='schedule-appointment__label--text'>Motivo de consulta</p>
                                                        <textarea
                                                            className='schedule-appointment__input'
                                                            onChange={(event) => setReason(event.target.value)}
                                                        ></textarea>
                                                    </label>
                                                    <button className='schedule-appointment__btn-submit' >Agendar</button>
                                                </>
                                            )
                                        }
                                    </>
                                ) : (
                                    <p className='schedule-appointment__label--text'>El psicólogo no tiene horarios disponibles en este momento</p>
                                )
                            }
                        </div>
                    </form>
                )
            }
        </main>
    )
}

export default ScheduleAppointment