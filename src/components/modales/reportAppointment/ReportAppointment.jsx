import React, { useEffect, useState } from 'react'
import { setModalAuxActive } from '../../../store/slides/modals/modals'
import { useDispatch } from 'react-redux'
import "./reportAppointment.scss"
import { updateAppointments } from '../../../services/updateAppointments'
import { swals } from '../../../services/swals'

const ReportAppointment = ({ appointmentId, appointments, setAppointments }) => {
    const dispatch = useDispatch()
    const [appointment, setAppointment] = useState({})
    const [reasonInput, setReasonInput] = useState("")

    useEffect(() => {
        const auxAppointment = appointments.find((appointment) => appointment.id === appointmentId)
        console.log(auxAppointment)
        setAppointment(auxAppointment)
    }, [])

    const handleReportAppointment = async () => {
        if (reasonInput) {
            const properties = {
                status: "UNFULFILLED",
                isVerified: false,
                reason: reasonInput
            }

            const resp = await updateAppointments(properties, appointmentId)
            if (resp) {
                const aux = appointments.filter((appointment) => appointment.id !== appointmentId)
                setAppointments(aux)
                swals("REPORT-APPOINTMENTS")
                setReasonInput("")
                dispatch(setModalAuxActive())
            } else {
                swals("ERROR-REPORT-APPOINTMENTS")
            }
        } else {
            swals("EMPTY-INPUT")
        }

    }

    const printDate = (date) => {
        const dateAux = new Date(date).toLocaleDateString()
        return `${dateAux.split("/")[0]} ${month(dateAux.split("/")[1])}`
    }

    const month = (month) => {
        switch (month) {
            case "1": return "Ene"
            case "2": return "Feb"
            case "3": return "Mar"
            case "4": return "Abr"
            case "5": return "May"
            case "6": return "Jun"
            case "7": return "Jul"
            case "8": return "Ago"
            case "9": return "Sep"
            case "10": return "Oct"
            case "11": return "Nov"
            case "12": return "Dic"
            default: return ""
        }
    }

    return (
        <article className='report-appointment'>
            <section className='report-appointment__container'>
                {
                    appointment?.id && (
                        <h1 className='report-appointment__title'>
                            {`${appointment.psychologistName.split(" ")[0]} ${appointment.psychologistName.split(" ")[1]} -
                            ${printDate(appointment.appointmentDate)}`}
                        </h1>
                    )
                }
                <p className='report-appointment__text'>¿Cuál fue el motivo por el cual no se llevo a cabo la cita?</p>
                <textarea
                    className='report-appointment__textarea'
                    onChange={(event) => setReasonInput(event.target.value)}
                ></textarea>
                <p className='report-appointment__alert'>Analizaremos los motivos del incumplimiento de la cita
                    y dependiendo de los motivos haremos o no la devolución del dinero y descuento de la cantidad de
                    citas por mes.</p>
                <div className='report-appointment__btn-container'>
                    <button className='report-appointment__confirm' onClick={handleReportAppointment}>Enviar Reporte</button>
                    <button className='report-appointment__cancel' onClick={() => dispatch(setModalAuxActive())}>Cancelar</button>
                </div>
            </section>
        </article>
    )
}

export default ReportAppointment