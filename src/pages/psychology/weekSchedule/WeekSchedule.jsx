import React, { useEffect, useState } from 'react'
import './main.scss'
import HeaderPsycho from '../../../components/headerPsycho/HeaderPsycho'
import { useNavigate } from "react-router-dom"
import { useGetAppointPsichoQuery, useGetClientPsychologistMutation } from '../../../store/api/firebaseApi'
import { convertirFechaEnMilisegundos } from '../../../services/dateManagement/conversorDate'
import ModalCancel from '../../../components/modalsPsycho/modalCancel/ModalCancel'
import { Toaster } from 'sonner'


const WeekSchedule = () => {
    const user = JSON.parse(localStorage.getItem('infoUser'));
    const actualPage = 1
    const prevPage = 1
    const navigate = useNavigate()
    const { data: appointments, isSuccess: successAppoint } = useGetAppointPsichoQuery(user.key)
    const [getClientPsychologist] = useGetClientPsychologistMutation()
    const [acceptedAppoint, setAcceptedAppoint] = useState([])
    const [openCancel, setOpenCancel] = useState(false)
    const [modalCancel, setModalCancel] = useState(false)
    const handleHistory = (appoint) => {
        navigate('/history')
    }

    useEffect(() => {
        if (successAppoint) {
            const pendingAppointments = appointments.filter((appoint) => appoint.status === "ACCEPTED");
            const fetchClientInfo = async (clientKey) => {
                const id = clientKey
                const clientInfo = await getClientPsychologist({ id });
                return clientInfo;
            };
            const updateAcceptedAppointments = async () => {
                const updatedPendingAppointments = [];
                for (const appoint of pendingAppointments) {
                    const time = convertirFechaEnMilisegundos(appoint.appointmentDate);
                    const { data: clientInfo } = await fetchClientInfo(appoint.clientKey);
                    updatedPendingAppointments.push({
                        clientName: clientInfo.displayName,
                        clientEmail: clientInfo.email,
                        time,
                        consultationReason: appoint.consultationReason,
                        id: appoint.id,
                        pureTime: appoint.appointmentDate,
                        hangoutUrl: appoint.urlAppointment
                    });
                }
                setAcceptedAppoint(updatedPendingAppointments);
            };
            updateAcceptedAppointments();
        }

    }, [successAppoint])

    const handleSelectCancel = (appoint) => {
        setModalCancel(appoint)
        setOpenCancel(true)


    }


    return (
        <main className='WeekSchedule__father'>
  <Toaster richColors position='bottom-right' />
            <HeaderPsycho />{

                acceptedAppoint.length ?
                    <section className='WeekSchedule'>
                        <h2>Citas programadas para esta semana</h2>



                        <section className='WeekSchedule__table'>
                            <div className='WeekSchedule__table__celda upLeft'><h3>Nombre del paciente</h3> </div>
                            <div className='WeekSchedule__table__celda   middle'><h3>Fecha de la cita</h3> </div>
                            <div className='WeekSchedule__table__celda middle'><h3>Historial</h3> </div>
                            <div className='WeekSchedule__table__celda upRight'><h3></h3> </div>
                            {
                                acceptedAppoint.sort((a, b) => a.pureTime - b.pureTime)
                                    .map((appoint, index) => (
                                        <>
                                            <div key={appoint.time} className='WeekSchedule__table__celda'> <span>{appoint.clientName}</span></div>
                                            <div  key={appoint.pureTime} className='WeekSchedule__table__celda'><span>{appoint.time}</span></div>
                                            <div key={appoint.id} className='WeekSchedule__table__celda' onClick={() => handleHistory(appoint)}><strong>Ver historial del paciente</strong></div>
                                            <div key={index} className='WeekSchedule__table__celda' onClick={() => handleSelectCancel(appoint) }><p>Cancelar cita</p></div>
                                        </>
                                    ))

                            }
                        </section>

                        <section className='WeekSchedule__pager'>
                            <p className='WeekSchedule__pager_page'>
                                {`${actualPage} - ${prevPage}`}
                            </p>
                            <section className='WeekSchedule__pager__arrows'>
                                <figure><img src="/Psychologist/arrow-prev.svg" alt="arrow-prev" /></figure>
                                <figure><img src="/Psychologist/arrow-next.svg" alt="arrow-next" /></figure>
                            </section>
                        </section>
                    </section>
                    :
                    <section className='WeekSchedule'>
                        <h2>Citas programadas para esta semana</h2>
                        <section className='WeekSchedule__table table__none'>
                            <div className='WeekSchedule__table__celda upLeft celda__none'><h3>No hay citas programadas.</h3> </div>

                        </section>
                        <section className='WeekSchedule__pager'>
                            <p className='WeekSchedule__pager_page'>
                                {`${actualPage} - ${prevPage}`}
                            </p>
                            <section className='WeekSchedule__pager__arrows'>
                                <figure><img src="/Psychologist/arrow-prev.svg" alt="arrow-prev" /></figure>
                                <figure><img src="/Psychologist/arrow-next.svg" alt="arrow-next" /></figure>
                            </section>
                        </section>
                    </section>
            }
            {
                openCancel &&
                <ModalCancel appoint={modalCancel} close={setOpenCancel}/> 
            }
        </main>
    )
}

export default WeekSchedule