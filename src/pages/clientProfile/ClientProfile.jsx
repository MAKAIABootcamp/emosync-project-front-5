import React from 'react'
import "./clientProfile.scss"

const ClientProfile = () => {

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
        <main className='client-profile'>
            <article className='client-profile__profile'>
                <section className='client-profile__info-container'>
                    <div className='client-profile__info'>
                        <h2 className='client-profile__info-title'>Nombre Completo</h2>
                        <p className='client-profile__info-subtitle'>Alejandra Sanchez</p>
                    </div>
                    <div className='client-profile__info'>
                        <h2 className='client-profile__info-title'>Correo Electrónico</h2>
                        <p className='client-profile__info-subtitle'>alejandra@example.com</p>
                    </div>
                    <div className='client-profile__info'>
                        <h2 className='client-profile__info-title'>Suscripción</h2>
                        <p className='client-profile__info-subtitle'>Plata</p>
                    </div>
                    <div className='client-profile__info'>
                        <h2 className='client-profile__info-title'>Citas cumplidas en el mes</h2>
                        <p className='client-profile__info-subtitle'>0</p>
                    </div>
                    <div className='client-profile__info'>
                        <h2 className='client-profile__info-title'>Método de pago </h2>
                        <p className='client-profile__info-subtitle'>******* 3456</p>
                    </div>
                    <button className='client-profile__btn-edit'>Editar Información</button>
                    <button className='client-profile__btn-emergency'>¡Tengo una emergencia!</button>
                </section>
                <section className='client-profile__logout-container'>
                    <p className='client-profile__logout'>Cerrar Sesión</p>
                    <img className='client-profile__logout-icon' src="/User/logout.svg" alt="" />
                </section>
            </article>
            <article className='client-profile__notifications'>
                <h1 className='client-profile__title'>Notificaciones</h1>
                <ul className='client-profile__notifications-list'>
                    {
                        notifications.map((notification, index) => (
                            <>
                                <li className={
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
                                </li>
                                <hr />
                            </>
                        ))
                    }
                </ul>
            </article>
        </main>
    )
}

export default ClientProfile