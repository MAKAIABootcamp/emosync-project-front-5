import React, { useEffect, useState } from 'react';
import "./main.scss";
import HeaderPsycho from '../../../components/headerPsycho/HeaderPsycho';
import { useSelector } from 'react-redux';
import apiCalendar, { listAllEvents } from '../../../googleC';
import { useEditAppointPsichoMutation, useGetAppointPsichoQuery, useGetClientPsychologistMutation, useGetUserByIdQuery } from '../../../store/api/firebaseApi';
import { obtenerFechaFormateada } from '../../../components/modalsPsycho/modalAddStrype/ModalAddStripe';
import { conversorToCalendarDate, convertirFechaEnMilisegundos } from '../../../services/dateManagement/conversorDate';
import { getPsychologist } from '../../../services/getPsychologist';
import ModalAppointInfo from '../../../components/modalsPsycho/appointInfo/ModalAppointInfo';
import ModalReject from '../../../components/modalsPsycho/modalReject/ModalReject';
import { Toaster, toast } from 'sonner';


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
  const [openPending, setOpenPending] = useState(false)
  const [modalPending, setModalPending] = useState(false)
  const [openReject, setOpenReject] = useState(false)
  const [modalReject, setModalReject] = useState(false)
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
      const hangoutLink = response.result.hangoutLink
      const formData = {
        status: "ACCEPTED",
        urlAppointment: hangoutLink,
        updatedAt: new Date().getTime(),
      }
      const id = appoint.id
      await editAppointPsicho({ formData, id })
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

      const fetchClientInfo = async (clientKey) => {
        const id = clientKey
        const clientInfo = await getClientPsychologist({id});
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
            time,
            consultationReason: appoint.consultationReason,
            id: appoint.id,
            pureTime: appoint.appointmentDate
          });
        }

        setPendingAppoint(updatedPendingAppointments);
      };

      updatePendingAppointments();
    }


  }, [successAppoint])



  const fechaFormateada = obtenerFechaFormateada()
  return (
    <main className='feed__father'>
      <Toaster richColors position='bottom-right' />
      <HeaderPsycho />
      <section className='feed'>
        <aside className='feed__welcome'>

          {nameArray.length &&
            <h2 className='feed__welcome__title'>Bienvenid@, {nameArray[0]}</h2>}
          <figure className='feed__welcome__advicer'>
            <img src="/Psychologist/infografia.jpg" alt="infografia" />
          </figure>
        </aside>
        <aside className='feed__appointments'>
          <section className='feed__appointments__appoint'>
            <h2 >Citas para hoy, {fechaFormateada}</h2>
            <section className='feed__appointments__appoint__table'>
              <div className='feed__appointments__appoint__table__celda upLeft'> <input type="checkbox" /> <span>Alejandra Sanchez</span></div>
              <div className='feed__appointments__appoint__table__celda upMiddle' ><span>12:00pm</span></div>
              <div className='feed__appointments__appoint__table__celda upRight'><strong>Entra al link de la cita</strong></div>
              <div className='feed__appointments__appoint__table__celda'><input type="checkbox" /> <span>Alejandra Sanchez</span></div>
              <div className='feed__appointments__appoint__table__celda'><span>12:00pm</span></div>
              <div className='feed__appointments__appoint__table__celda'><strong>Entra al link de la cita</strong></div>
              <div className='feed__appointments__appoint__table__celda'><input type="checkbox" /> <span>Alejandra Sanchez</span></div>
              <div className='feed__appointments__appoint__table__celda'><span>12:00pm</span></div>
              <div className='feed__appointments__appoint__table__celda'><strong>Entra al link de la cita</strong></div>
              <div className='feed__appointments__appoint__table__celda downLeft'><input type="checkbox" /> <span>Alejandra Sanchez</span></div>
              <div className='feed__appointments__appoint__table__celda'><span>12:00pm</span></div>
              <div className='feed__appointments__appoint__table__celda downRight'><strong>Entra al link de la cita</strong></div>

            </section>

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
    </main>
  )
}

export default FeedPsycho