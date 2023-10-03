import React from 'react'
import "./cancelAppointment.scss"
import { useDispatch, useSelector } from 'react-redux'
import { setModalActive } from '../../../store/slides/modals/modals'
import { updateAppointments } from '../../../services/updateAppointments'
import { swals } from '../../../services/swals'
import { updateAppointmentsPerMonth } from '../../../services/updateUser'
import { updateAppointmentsPerMonthValue } from '../../../store/slides/user/user'

const CancelAppointment = ({ propsCancelAppointment: { appointmentId, appointments, setAppointments, verifiedSpecialty } }) => {
    const dispatch = useDispatch()
    const { key } = useSelector(state => state.auth)

    const handleCancelAppointment = async () => {
        const resp = await updateAppointments({ status: "CANCELLED", cancelBy: "CLIENT" }, appointmentId)
        if (resp) {
            !verifiedSpecialty && await updateAppointmentsPerMonth(key)
            !verifiedSpecialty && dispatch(updateAppointmentsPerMonthValue())
            const aux = appointments.filter((appointment) => appointment.id !== appointmentId)
            setAppointments(aux)
            swals("CANCEL-APPOINTMENTS")
        } else {
            swals("ERROR-CANCEL-APPOINTMENTS")
        }
        dispatch(setModalActive())
    }
    return (
        <article className='cancel-appointment-modal'>
            <section className='cancel-appointment-modal__container'>
                <p className='cancel-appointment-modal__alert'>Se descontará la cita de la cantidad de citas que has tomado
                    este mes (dado el caso de que sea con un psicólogo general),
                    si la cita fue cobrada como cita extra se devolverá tu dinero.</p>
                <div className='cancel-appointment-modal__btn-container'>
                    <button className='cancel-appointment-modal__confirm' onClick={handleCancelAppointment}>Cancelar cita</button>
                    <button className='cancel-appointment-modal__cancel' onClick={() => dispatch(setModalActive())}>
                        Cancelar
                    </button>
                </div>
            </section>
        </article>
    )
}

export default CancelAppointment