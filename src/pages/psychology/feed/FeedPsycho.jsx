import React, { useEffect, useState } from 'react';
import "./main.scss";
import HeaderPsycho from '../../../components/headerPsycho/HeaderPsycho';
import { useSelector } from 'react-redux';
import apiCalendar, { listAllEvents } from '../../../googleC';
import { useAddClientAppointmentsMutation, useAddNotifyUserMutation, useEditAppointPsichoMutation, useGetAppointPsichoQuery, useGetClientPsychologistMutation, useGetUserByIdQuery } from '../../../store/api/firebaseApi';
import { obtenerFechaFormateada } from '../../../components/modalsPsycho/modalAddStrype/ModalAddStripe';
import { conversorToCalendarDate, convertirFechaEnMilisegundos } from '../../../services/dateManagement/conversorDate';
import { getPsychologist } from '../../../services/getPsychologist';
import ModalAppointInfo from '../../../components/modalsPsycho/appointInfo/ModalAppointInfo';
import ModalReject from '../../../components/modalsPsycho/modalReject/ModalReject';
import { Toaster, toast } from 'sonner';
import PostAppoint from '../../../components/modalsPsycho/postAppoint/PostAppoint';


const FeedPsycho = () => {

  const [userInfo, setUserInfo] = useState(false)
  const [nameArray, setNameArray] = useState([])
  const cacheUser = useSelector(state => state.psycho.userInfo)
  const [changer, setChanger] = useState(0)
  const [calendarState, setCalendarState] = useState(false)
  const user = JSON.parse(localStorage.getItem('infoUser'));
  const { data: userInfo2, isSuccess, isLoading } = useGetUserByIdQuery(user.key)
  const { data: appointments, isSuccess: successAppoint } = useGetAppointPsichoQuery(user.key)
  const [pendingAppoint, setPendingAppoint] = useState([])
  const [acceptedAppoint, setAcceptedAppoint] = useState([])
  const [openPending, setOpenPending] = useState(false)
  const [modalPending, setModalPending] = useState(false)
  const [openReject, setOpenReject] = useState(false)
  const [modalReject, setModalReject] = useState(false)
  const [openAppoint, setOpenAppoint] = useState(false)
  const [modalAppoint, setModalAppoint] = useState(false)
  const [addNotifyUser] = useAddNotifyUserMutation()
  const [addClientAppointments] = useAddClientAppointmentsMutation()


  const [editAppointPsicho] = useEditAppointPsichoMutation()
  const [getClientPsychologist] = useGetClientPsychologistMutation()

  const handleSelectPending = (appoint) => {
    setModalPending(appoint)
    setOpenPending(true)
  };


  const handleSelectReject = (appoint) => {
    setModalReject(appoint)
    setOpenReject(true)

  };
  const handleSelectConfirm = async (appoint) => {
    const response = await apiCalendar.handleAuthClick();

    const milHour = 60 * 60 * 1000;

    const start = conversorToCalendarDate(appoint.pureTime);
    const prototypeEnd = appoint.pureTime + milHour
    const end = conversorToCalendarDate(prototypeEnd);
    try {
      const event = {
        summary: `Asesoría ${appoint.clientName}`,
        description: appoint.consultationReason,
        start: {
          dateTime: start,
          timeZone: 'America/Bogota',
        },
        end: {
          dateTime: end,
          timeZone: 'America/Bogota',
        },
        attendees: [
          { email: userInfo2.email },
          { email: appoint.clientEmail },
        ],
      };
      console.log(event);
      const response = await apiCalendar.createEventWithVideoConference(event);
      const hangoutLink = response.result.hangoutLink;
      const idClient = appoint.clientKey
      const formData = {
        status: "ACCEPTED",
        urlAppointment: hangoutLink,
        updatedAt: new Date().getTime(),
      }
      const id = appoint.id
      const formNotify = {
        createdAt: new Date().getTime(),
        isRead: false,
        psychologistKey: user.key,
        status: "ACCEPTED",
        appointId: id,
        updatedAt: new Date().getTime(),
        appointmentDate: appoint.pureTime
      }

      await editAppointPsicho({ formData, id })
      await addClientAppointments({ idClient })
      const response3 = await addNotifyUser({ formNotify, idClient })


      toast.success('¡Cita confirmada con éxito!')

      return response

    } catch (error) {
      console.log(error);
    }
  };

  const handleItemClick = async (name) => {
    if (name === 'sign-in') {
      const response = await apiCalendar.handleAuthClick();
      console.log(response);
      setCalendarState(true)
    } else if (name === 'sign-out') {
      const response = apiCalendar.handleSignoutClick();
      console.log(response);
    }
  }



  useEffect(() => {
    if (isSuccess) {
      setUserInfo(userInfo2)
      setNameArray(userInfo2.displayName.split(" "))
    }
  }, [userInfo2, isSuccess])

  useEffect(() => {
    setChanger(prevChanger => prevChanger + 1)
  }, [userInfo])


  useEffect(() => {
    if (calendarState) {
      listAllEvents()
    }

  }, [calendarState])



  useEffect(() => {
    if (successAppoint) {
      const pendingAppointments = appointments.filter((appoint) => appoint.status === "PENDING");
      const acceptedAppointments = appointments.filter((appoint) => appoint.status === "ACCEPTED");
      const fetchClientInfo = async (clientKey) => {
        const id = clientKey
        const clientInfo = await getClientPsychologist({ id });
        return clientInfo;
      };

      const updatePendingAppointments = async () => {
        const updatedPendingAppointments = [];

        for (const appoint of pendingAppointments) {
          const time = convertirFechaEnMilisegundos(appoint.appointmentDate);
          const { data: clientInfo } = await fetchClientInfo(appoint.clientKey);
          updatedPendingAppointments.push({
            clientName: clientInfo.displayName,
            clientEmail: clientInfo.email,
            clientKey: appoint.clientKey,
            time,
            consultationReason: appoint.consultationReason,
            id: appoint.id,
            pureTime: appoint.appointmentDate
          });
        }

        setPendingAppoint(updatedPendingAppointments);
      };

      const updateAcceptedAppointments = async () => {
        const updatedAcceptedAppointments = [];
        const currentDate = new Date().getTime();

        const dayAcceptedAppointments = acceptedAppointments.filter((appoint) => {
          const citaDate = appoint.appointmentDate;
          return citaDate >= currentDate && citaDate < currentDate + 86400000; // 86400000 milisegundos en un día
        });
        for (const appoint of dayAcceptedAppointments) {
          const time = convertirFechaEnMilisegundos(appoint.appointmentDate);
          const { data: clientInfo } = await fetchClientInfo(appoint.clientKey);
          updatedAcceptedAppointments.push({
            clientName: clientInfo.displayName,
            clientEmail: clientInfo.email,
            clientKey: appoint.clientKey,
            time,
            consultationReason: appoint.consultationReason,
            id: appoint.id,
            pureTime: appoint.appointmentDate,
            hangoutURL: appoint.urlAppointment
          });
          console.log(appoint.urlAppointment);
        }

        setAcceptedAppoint(updatedAcceptedAppointments);
      };

      updatePendingAppointments();
      updateAcceptedAppointments()
    }


  }, [successAppoint])

  const handleHangout = (url) => {
    window.open(url, '_blank');

  }

  const handleAppoint = (appoint) => {
    setModalAppoint(appoint)
    setOpenAppoint(true)
  }

  const fechaFormateada = obtenerFechaFormateada()
  return (
    <main className='feed__father'>
      <Toaster richColors position='bottom-right' />
      <HeaderPsycho />
      <section className='feed'>
        <aside className='feed__welcome'>

          {nameArray.length &&
            <h2 className='feed__welcome__title'>Bienvenid@, {nameArray[0]}</h2>}
          <h2 className='feed__welcome__subtitle'>Para tomar en cuenta</h2>
          <section className='feed__welcome__adviser'>
            <article className='feed__welcome__adviser__square'>
              <figure><img src="/Psychologist/Punctual.svg" alt="Punctual" /></figure>
              <h3>Sé puntual y organizado</h3>
              <p>La impresión del usuario es importante.</p>
            </article>
            <article className='feed__welcome__adviser__square'>
              <figure><img src="/Psychologist/time.svg" alt="time" /></figure>
              <h3>Maneja el tiempo</h3>
              <p>Cada asesoría dura una hora; realiza el cierre 5 minutos antes.</p>
            </article>
            <article className='feed__welcome__adviser__square'>
              <figure><img src="/Psychologist/free.svg" alt="freedom" /></figure>
              <h3>Sé libre</h3>
              <p>Cada psicólogo puede llevar el proceso como desee, siempre que el paciente lo decida.</p>
            </article>
            <article className='feed__welcome__adviser__square'>
              <figure><img src="/Psychologist/register.svg" alt="register" /></figure>
              <h3>Registra tu sesión</h3>
              <p>Al finalizar cada asesoría, llena el apartado de impresión diagnóstica.</p>
            </article>
            <article className='feed__welcome__adviser__square'>
              <figure><img src="/Psychologist/professional.svg" alt="professional" /></figure>
              <h3>Sé profesional</h3>
              <p>Vela por el beneficio del paciente y siempre mantén tu carácter profesional.</p>
            </article>
          </section>
        </aside>
        <aside className='feed__appointments'>
          <section className='feed__appointments__appoint'>
            <h2 >Proximas citas, {fechaFormateada}</h2>
            {
              acceptedAppoint.length ?
                <section className='feed__appointments__appoint__table'>
                  {
                    acceptedAppoint.sort((a, b) => a.pureTime - b.pureTime)
                      .map((appoint, index) => (
                        <>
                          <div key={appoint.id} className='feed__appointments__appoint__table__celda upLeft appoint' onClick={() => handleAppoint(appoint)}> <input type="checkbox" disabled /> <span>{appoint.clientName}</span></div>
                          <div key={appoint.time} className='feed__appointments__appoint__table__celda upMiddle' ><span>{appoint.time}</span></div>
                          <div key={index} className='feed__appointments__appoint__table__celda upRight'><strong onClick={() => handleHangout(appoint.hangoutURL)}>Entra al link de la cita</strong></div>
                        </>
                      ))
                  }

                </section>
                :
                <section className='feed__appointments__pendingAppoint__table table__none'>
                  <div className='feed__appointments__pendingAppoint__table__celda  celda__none'>No hay citas pendientes por confirmar o rechazar.</div>

                </section>
            }
          </section>

          <section className='feed__appointments__pendingAppoint'>
            <h2 >Citas pendientes por confirmar</h2>
            {
              pendingAppoint.length ?

                <section className='feed__appointments__pendingAppoint__table'>
                  {
                    pendingAppoint.sort((a, b) => a.pureTime - b.pureTime)
                      .map((appoint, index) => (
                        <>
                          <div key={appoint.id} className='feed__appointments__pendingAppoint__table__celda upLeft'>
                            <figure onClick={() => handleSelectPending(appoint)}><img src="/Psychologist/details.svg" alt="details.svg" /></figure>
                            <span>{appoint.clientName}</span>
                          </div>
                          <div key={appoint.time} className='feed__appointments__pendingAppoint__table__celda upMiddle'>
                            <span>{appoint.time}</span>
                          </div>
                          <div key={index} className='feed__appointments__pendingAppoint__table__celda upRight'>
                            <strong onClick={() => handleSelectConfirm(appoint)}>Confirmar</strong>
                            <p onClick={() => handleSelectReject(appoint)}>Rechazar</p>
                          </div>
                        </>
                      ))
                  }
                </section>
                :
                <section className='feed__appointments__pendingAppoint__table table__none'>
                  <div className='feed__appointments__pendingAppoint__table__celda  celda__none'>No hay citas pendientes por confirmar o rechazar.</div>

                </section>
            }


          </section>
        </aside>
      </section>
      {
        openPending &&
        < ModalAppointInfo appoint={modalPending} close={setOpenPending} />
      }
      {
        openReject &&
        <ModalReject appoint={modalReject} close={setOpenReject} />
      }
      {
        openAppoint &&
        <PostAppoint appoint={modalAppoint} close={setOpenAppoint} psicoInf={userInfo2} />
      }

    </main>
  )
}

export default FeedPsycho