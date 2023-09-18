import React from 'react'
import "./pendingAppointmentsClient.scss"

const PendingAppointmentsClient = () => {

    const appointments = [
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
        {
            name: "Juliana Sánchez Sáenz",
            date: "7 Oct, 2:30pm",
        },
    ]
    
    return (
        <section className='pending-appointments-client'>
            <h1 className='pending-appointments-client__title'>Citas pendientes para está semana</h1>
            <table className='pending-appointments-client__table'>
                <tr className='pending-appointments-client__tr'>
                    <th className='pending-appointments-client__th'>Psicólogo</th>
                    <th className='pending-appointments-client__th'>Fecha de la cita</th>
                    <th className='pending-appointments-client__th'>Enalces</th>
                    <th className='pending-appointments-client__th'>Cancelación</th>
                </tr>
                {
                    appointments.map((item, index) => (
                        <tr key={index + 1} className='pending-appointments-client__tr'>
                            <td className='pending-appointments-client__td'>
                                <figure>
                                    <img src="/User/exclamation-mark-svgrepo-com.svg" alt="" />
                                    <figcaption>Da click aquí para reportar en caso tal de que la cita haya sido incumplida.</figcaption>
                                </figure>
                                {item.name}
                            </td>
                            <td className='pending-appointments-client__td'>{item.date}</td>
                            <td className='pending-appointments-client__td link'><a href="">Link</a></td>
                            <td className='pending-appointments-client__td cancel-appointment'>Cancelar cita</td>
                        </tr>
                    ))
                }
            </table>
        </section>
    )
}

export default PendingAppointmentsClient