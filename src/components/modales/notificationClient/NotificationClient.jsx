import React from 'react'
import "./notificationClient.scss"
import { useDispatch } from 'react-redux'
import { setModalActive } from '../../../store/slides/modals/modals'

const NotificationClient = () => {
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(setModalActive())
    }

    return (
        <article className='notification-client'>
            <section className='notification-client__container'>
                <img src="/User/close.svg" alt="close icon" className='notification-client__close-icon' onClick={closeModal} />
                <h2 className='notification-client__title'>Nombre del psicólogo</h2>
                <p className='notification-client__text'>Juliana Sanchez Saenz</p>
                <h2 className='notification-client__title'>Especialidad</h2>
                <p className='notification-client__text'>Psicólogo General</p>
                <h2 className='notification-client__title'>Motivo de Consulta</h2>
                <p className='notification-client__text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium convallis ipsum, eu laoreet
                    magna vestibulum a. Suspendisse lacinia leo id egestas mattis. Suspendisse a purus et velit tempus porta. </p>
                {/* <h2 className='notification-client__title'>Fecha de la cita</h2>
                <p className='notification-client__text'>7 Oct - 2:30pm </p>
                <p className='notification-client__alert'>Puedes acceder al link de la consulta en el apartado de citas pendientes.</p> */}
            </section>
        </article>
    )
}

export default NotificationClient