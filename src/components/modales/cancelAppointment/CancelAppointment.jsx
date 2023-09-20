import React from 'react'
import "./cancelAppointment.scss"
import { useDispatch } from 'react-redux'
import { setModalActive } from '../../../store/slides/modals/modals'
import { updateAppointments } from '../../../services/updateAppointments'
import { swals } from '../../../services/swals'

const CancelAppointment = ({ appointmentId, appointments, setAppointments }) => {
    const dispatch = useDispatch()

    const handleCancelAppointment = async () => {
        const resp = await updateAppointments({ status: "CANCELLED", cancelBy: "CLIENT" }, appointmentId)
        if (resp) {
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
                    este mes, si la cita fue cobrada como cita extra se devolverá tu dinero.</p>
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