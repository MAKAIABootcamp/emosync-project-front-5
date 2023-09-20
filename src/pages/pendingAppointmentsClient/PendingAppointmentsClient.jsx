import React, { useEffect, useState } from 'react'
import "./pendingAppointmentsClient.scss"
import { useDispatch, useSelector } from 'react-redux'
import CancelAppointment from '../../components/modales/cancelAppointment/CancelAppointment'
import { setModalActive, setModalAuxActive } from '../../store/slides/modals/modals'
import ReportAppointment from '../../components/modales/reportAppointment/ReportAppointment'
import { getAppointmentsClient } from '../../services/getAppointmentsClient'
import { getPsychologist } from '../../services/getPsychologist'
import { updateAppointments } from '../../services/updateAppointments'

const PendingAppointmentsClient = () => {
    const { modalActive, modalAuxActive } = useSelector(state => state.modals)
    const { key } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [appointments, setAppointments] = useState([])
    const [appointmentId, setAppointmentId] = useState("")
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const { data } = await getAppointmentsClient(key)
        let psychologistInfo = {}
        const aux = data;
        for (let i = 0; i < aux.length; i++) {
            psychologistInfo = await getPsychologist(aux[i].psychologistKey)
            aux[i].psychologistName = psychologistInfo.data.displayName;
        }
        setAppointments(aux)
    }

    const handleCancelAppointment = async (id) => {
        setAppointmentId(id)
        dispatch(setModalActive())
    }

    const handleReportAppointment = () => {
        dispatch(setModalAuxActive())
    }

    return (
        <section className='pending-appointments-client'>
            {
                modalActive && (
                    <CancelAppointment
                    appointmentId={appointmentId}
                    appointments={appointments}
                    setAppointments={setAppointments}/>
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
                        appointments.length > 0 && appointments.map((item, index) => (
                            <tr key={index + 1} className='pending-appointments-client__tr'>
                                <td className='pending-appointments-client__td'>
                                    <figure onClick={handleReportAppointment}>
                                        <img src="/User/exclamation-mark-svgrepo-com.svg" alt="" />
                                        <figcaption>Da click aquí para reportar en caso tal de que la cita haya sido incumplida.</figcaption>
                                    </figure>
                                    {item.psychologistName}
                                </td>
                                <td className='pending-appointments-client__td'>{item.date}</td>
                                <td className='pending-appointments-client__td link'><a href={item.urlAppointment}>Link</a></td>
                                <td className='pending-appointments-client__td cancel-appointment' onClick={()=> handleCancelAppointment(item.id)}>
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