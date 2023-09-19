import React from 'react'
import "./pendingAppointmentsClient.scss"
import { useDispatch, useSelector } from 'react-redux'
import CancelAppointment from '../../components/modales/cancelAppointment/CancelAppointment'
import { setModalActive, setModalAuxActive } from '../../store/slides/modals/modals'
import ReportAppointment from '../../components/modales/reportAppointment/ReportAppointment'

const PendingAppointmentsClient = () => {
    const { modalActive, modalAuxActive } = useSelector(state => state.modals)
    const dispatch = useDispatch()
    const appointments = [
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
    ]

    const handleCancelAppointment = () => {
        dispatch(setModalActive())
    }

    const handleReportAppointment = () => {
        dispatch(setModalAuxActive())
    }

    return (
        <section className='pending-appointments-client'>
            {
                modalActive && (
                    <CancelAppointment />
                )
            }
            {
                modalAuxActive && (
                    <ReportAppointment />
                )
            }
            <h1 className='pending-appointments-client__title'>Citas pendientes para está semana</h1>
            <table className='pending-appointments-client__table'>
                <thead className='pending-appointments-client__tr'>
                    <tr>
                        <th className='pending-appointments-client__th'>Psicólogo</th>
                        <th className='pending-appointments-client__th'>Fecha de la cita</th>
                        <th className='pending-appointments-client__th'>Enalces</th>
                        <th className='pending-appointments-client__th'>Cancelación</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        appointments.map((item, index) => (
                            <tr key={index + 1} className='pending-appointments-client__tr'>
                                <td className='pending-appointments-client__td'>
                                    <figure onClick={handleReportAppointment}>
                                        <img src="/User/exclamation-mark-svgrepo-com.svg" alt="" />
                                        <figcaption>Da click aquí para reportar en caso tal de que la cita haya sido incumplida.</figcaption>
                                    </figure>
                                    {item.name}
                                </td>
                                <td className='pending-appointments-client__td'>{item.date}</td>
                                <td className='pending-appointments-client__td link'><a href="">Link</a></td>
                                <td className='pending-appointments-client__td cancel-appointment' onClick={handleCancelAppointment}>
                                    Cancelar cita
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </section>
    )
}

export default PendingAppointmentsClient