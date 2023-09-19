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
            </section>
        </article>
    )
}

export default NotificationClient