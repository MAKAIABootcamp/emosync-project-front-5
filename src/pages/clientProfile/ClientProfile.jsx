import React, { useEffect, useState } from 'react'
import "./clientProfile.scss"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { reset } from '../../store/slides/auth/auth'
import { logout } from '../../store/slides/user/user'
import NotificationClient from '../../components/modales/notificationClient/NotificationClient'
import { setModalActive } from '../../store/slides/modals/modals'
import { getNotifications } from '../../services/getNotifications'
import { getPsychologist } from '../../services/getPsychologist'
import { updateNotification } from '../../services/updateNotification'
import EmptyState from '../../components/emptyState/EmptyState'

const ClientProfile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { appointmentsPerMonth, cardNumber, displayName, subscription, email } = useSelector(state => state.user)
    const { key } = useSelector(state => state.auth)
    const { modalActive } = useSelector(state => state.modals)
    const [notifications, setNotifications] = useState([])
    const [notification, setNotification] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const { data } = await getNotifications(key)
        let psychologistInfo = {}
        const aux = data;
        for (let i = 0; i < aux.length; i++) {
            psychologistInfo = await getPsychologist(aux[i].psychologistKey)
            aux[i].psychologistName = psychologistInfo.data.displayName;
            aux[i].psychologistSpecialty = psychologistInfo.data.verifiedSpecialty ? psychologistInfo.data.specialty : "Psicolog@ General";
        }
        setNotifications(aux)
    }

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

    const handleNotification = async (selected) => {
        dispatch(setModalActive())
        setNotification(selected)
        const aux = notifications
        if (!selected.isRead) {
            aux.forEach((noti) => {
                noti.isRead = noti.id === selected.id ? true : noti.isRead
            })
            setNotifications(aux)
            await updateNotification({ isRead: true }, key, selected.id)
        }
    }

    return (
        < section className='client-profile' >
            {
                modalActive && (
                    <NotificationClient notification={notification} />
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
                        <h2 className='client-profile__info-title'>Citas con Psicólogo General en el mes</h2>
                        <p className='client-profile__info-subtitle'>{appointmentsPerMonth}</p>
                    </div>
                    <div className='client-profile__info'>
                        <h2 className='client-profile__info-title'>Método de pago </h2>
                        <p className='client-profile__info-subtitle'>{`**** **** **** ${cardNumber.split(" ")[3]}`}</p>
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
                {
                    notifications.length > 0 ? (
                        <ul className='client-profile__notifications-list'>
                            {
                                notifications.map((notification, index) => (
                                    <li key={index + 1} className='client-profile__container' onClick={() => handleNotification(notification)}>
                                        <section className={
                                            `client-profile__notifications-item
                                    ${notification.status === "ACCEPTED"
                                                ? "client-profile__accepted"
                                                : "client-profile__rejected"}
                                    ${notification.isRead ? "client-profile__viewed" : ""}
                                        `}>
                                            <div></div>
                                            <p>
                                                {
                                                    `${notification.status === "ACCEPTED"
                                                        ? "Cita confirmada por "
                                                        : notification.status === "REJECTED"
                                                            ? "Cita rechazada por "
                                                            : "Cita cancelada por "}
                                        ${notification.psychologistName}`}
                                            </p>
                                        </section>
                                        <hr />
                                    </li>
                                ))
                            }
                        </ul>
                    ) : (
                        <EmptyState type={"NOTIFICATIONS"} />
                    )
                }

            </div>
        </section >
    )
}

export default ClientProfile