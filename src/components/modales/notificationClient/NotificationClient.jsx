import React from 'react'
import "./notificationClient.scss"
import { useDispatch } from 'react-redux'
import { setModalActive } from '../../../store/slides/modals/modals'
import { printDate } from '../../../services/printDate'

const NotificationClient = ({ notification }) => {
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(setModalActive())
    }



    return (
        <article className='notification-client'>
            <section className='notification-client__container'>
                <img src="/User/close.svg" alt="close icon" className='notification-client__close-icon' onClick={closeModal} />
                <h2 className='notification-client__title'>Nombre del psicólogo</h2>
                <p className='notification-client__text'>{notification.psychologistName}</p>
                <h2 className='notification-client__title'>Especialidad</h2>
                <p className='notification-client__text'>{notification.psychologistSpecialty}</p>
                {
                    notification.status === "REJECTED" ? (
                        <>
                            <h2 className='notification-client__title'>Motivo de Rechazo</h2>
                            <p className='notification-client__text'>{notification.reason}</p>
                        </>
                    ) : notification.status === "ACCEPTED" ? (
                        <>
                            <h2 className='notification-client__title'>Fecha de la cita</h2>
                            <p className='notification-client__text'>{printDate(notification.appointmentDate)}</p>
                            <p className='notification-client__alert'>Puedes acceder al link de la consulta en el apartado de citas pendientes.</p>
                        </>
                    ) : (
                        <>
                            <h2 className='notification-client__title'>Motivo de Cancelación</h2>
                            <p className='notification-client__text'>{notification.reason}</p>
                        </>
                    )
                }
            </section>
        </article>
    )
}

export default NotificationClient