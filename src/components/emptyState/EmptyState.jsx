import React from 'react'
import "./emptyState.scss"

const EmptyState = ({ type }) => {
    return (
        <div className='empty-state'>
            {
                type === "SEARCH" && (
                    <>
                        <h2 className='empty-state__title'>No se encontró nada que coincida con tu búsqueda.</h2>
                        <img className='empty-state__img' src="/searching.svg" alt="searching icon" />
                    </>
                )
            }
            {
                type === "APPOINTMENTS" && (
                    <>
                        <h2 className='empty-state__title'>No tienes citas pendientes.</h2>
                        <img className='empty-state__img' src="/appointments.svg" alt="searching icon" />
                    </>
                )
            }
            {
                type === "NOTIFICATIONS" && (
                    <>
                        <h2 className='empty-state__title'>No tienes notificaciones aún.</h2>
                        <img className='empty-state__img' src="/notifications.svg" alt="searching icon" />
                    </>
                )
            }
        </div>
    )
}

export default EmptyState