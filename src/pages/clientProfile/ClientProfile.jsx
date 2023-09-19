import React from 'react'
import "./clientProfile.scss"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { reset } from '../../store/slides/auth/auth'
import { logout } from '../../store/slides/user/user'
import NotificationClient from '../../components/modales/notificationClient/NotificationClient'
import { setModalActive } from '../../store/slides/modals/modals'

const ClientProfile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { appointmentsPerMonth, cardNumber, displayName, subscription, email } = useSelector(state => state.user)
    const { modalActive } = useSelector(state => state.modals)

    const handleLogout = () => {
        dispatch(reset())
        dispatch(logout())
        navigate('/')
    }

    const handleSubscription = () => {
        switch (subscription) {
            case "BRONZE": return "Bronce"
            case "SILVER": return "Plata"
            case "GOLD": return "Oro"
            default: return ""
        }
    }

    const handleNotification = () => {
        dispatch(setModalActive())
    }

    const notifications = [
        {
            psychologist: "Juliana Sanchez",
            isAccepted: true,
            isView: false
        },
        {
            psychologist: "Juliana Sanchez",
            isAccepted: false,
            isView: false
        },
        {
            psychologist: "Juliana Sanchez",
            isAccepted: true,
            isView: true
        },
    ]

    return (
        < section className='client-profile' >
            {
                modalActive && (
                    <NotificationClient/>
                )
            }

            <div className='client-profile__profile' >
                <div className='client-profile__info-container'>
                    <div className='client-profile__info'>
                        <h2 className='client-profile__info-title'>Nombre Completo</h2>
                        <p className='client-profile__info-subtitle'>{displayName}</p>
                    </div>
                    <div className='client-profile__info'>
                        <h2 className='client-profile__info-title'>Correo Electrónico</h2>
                        <p className='client-profile__info-subtitle'>{email}</p>
                    </div>
                    <div className='client-profile__info'>
                        <h2 className='client-profile__info-title'>Suscripción</h2>
                        <p className='client-profile__info-subtitle'>{handleSubscription()}</p>
                    </div>
                    <div className='client-profile__info'>
                        <h2 className='client-profile__info-title'>Citas cumplidas en el mes</h2>
                        <p className='client-profile__info-subtitle'>{appointmentsPerMonth}</p>
                    </div>
                    <div className='client-profile__info'>
                        <h2 className='client-profile__info-title'>Método de pago </h2>
                        <p className='client-profile__info-subtitle'>{cardNumber}</p>
                    </div>
                    <button className='client-profile__btn-edit' onClick={() => navigate("/edit-profile")}> Editar Información</button>
                    <button className='client-profile__btn-emergency'>
                        <a href="https://api.whatsapp.com/send/?phone=%2B573107185211&text=Hola%2C+necesito+ayuda&type=phone_number&app_absent=0">
                            ¡Tengo una emergencia!
                        </a>
                    </button>
                </div>
                <div className='client-profile__logout-container' onClick={handleLogout}>
                    <p className='client-profile__logout'>Cerrar Sesión</p>
                    <img className='client-profile__logout-icon' src="/User/logout.svg" alt="" />
                </div>
            </div >
            <div className='client-profile__notifications'>
                <h1 className='client-profile__title'>Notificaciones</h1>
                <ul className='client-profile__notifications-list'>
                    {
                        notifications.map((notification, index) => (
                            <li key={index + 1} className='client-profile__container' onClick={()=> handleNotification()}>
                                <section className={
                                    `client-profile__notifications-item
                                    ${notification.isAccepted
                                        ? "client-profile__accepted"
                                        : "client-profile__rejected"}
                                    ${notification.isView ? "client-profile__viewed" : ""}
                                        `}>
                                    <div></div>
                                    <p>
                                        {
                                            `${notification.isAccepted
                                                ? "Cita confirmada por "
                                                : "Cita rechazada por "}
                                        ${notification.psychologist}`}
                                    </p>
                                </section>
                                <hr />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section >
    )
}

export default ClientProfile