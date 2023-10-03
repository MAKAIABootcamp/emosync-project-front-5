import React, { useEffect, useId, useMemo, useState } from 'react'
import "./main.scss"
import HeaderPsycho from '../../../components/headerPsycho/HeaderPsycho'
import { Calendar, dateFnsLocalizer, momentLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'

//dayjs.locale('es')
import moment from "moment";
//const localizer = dayjsLocalizer(dayjs)
import apiCalendar, { listAllEvents } from '../../../googleC';
import Loader from '../../../components/loader/Loader'
import ModalShowEvent from '../../../components/modalsPsycho/modalShowEvent/ModalShowEvent'
import Swal from 'sweetalert2'
import { useEditDataUserMutation, useGetUserByIdQuery } from '../../../store/api/firebaseApi'
import { toast, Toaster } from 'sonner'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'

import es from 'moment/locale/es.js';
  
  const localizer = momentLocalizer(moment);

// const locales = {
//    es: es,
// };
// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });




const CalendarPsycho = () => {

  const [modalPlacement, setModalPlacement] = React.useState("auto");
  const email = 'sebasruiz15@gmail.com'
  const [infoEvent, setInfoEvent] = useState([]);
  const [calendarState, setCalendarState]= useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [modalEvent, setModalEvent] = useState(false)
  const [events, setEvents] = useState([ ]);
const  [hola, setHola] = useState(false)
const  [hola2, setHola2] = useState(false)
const [editDataUser] = useEditDataUserMutation()
const user = JSON.parse(localStorage.getItem('infoUser'));
const {data: userInfo2, isSuccess, isLoading} = useGetUserByIdQuery(user.key)
const [culture, setCulture] = useState('es')
const modalAddStripe = async () => {

  const { value: day } = await Swal.fire({
      title: 'Selecciona un día en el que quieras trabajar',
      input: 'select',
      inputOptions: {
        lunes: 'Lunes',
        martes: 'Martes',
        miercoles: 'Miercoles',
        jueves: 'Jueves',
        viernes: 'Viernes',
        sabado: 'Sabado',
        domingo: 'Domingo'
      },
      inputPlaceholder: 'Selecciona un día',
      showCancelButton: true,
      confirmButtonColor: '#1CACA5',
       cancelButtonColor: '#A4A4A4',
       confirmButtonText: 'Listo',
       cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value !== undefined || null) {
            resolve()
          } else {
            resolve('Necesitas seleccionar un día')
          }
        })
      }
    })
    if (day) {
      const { value: hourStart } = await Swal.fire({
          title: 'Selecciona la hora en la que quieras empezar a trabajar',
          input: 'select',
          inputOptions: {
              8: '8:00 AM',
              9: '9:00 AM',
              10: '10:00 AM',
              11: '11:00 AM',
              12: '12:00 PM',
              13: '1:00 PM',
              14: '2:00 PM',
              15: '3:00 PM',
              16: '4:00 PM',
              17: '5:00 PM',
              18: '6:00 PM',
              19: '7:00 PM',
              20: '8:00 PM'
          },
          inputPlaceholder: 'Selecciona una hora',
          showCancelButton: true,
          confirmButtonColor: '#1CACA5',
           cancelButtonColor: '#A4A4A4',
           confirmButtonText: 'Listo',
           cancelButtonText: 'Cancelar',
          inputValidator: (value) => {
            return new Promise((resolve) => {
              if (value !== undefined || null) {
                resolve()
              } else {
                resolve('Necesitas seleccionar una hora')
              }
            })
          }

        })
        if (hourStart){  
          const { value: hourEnd } = await Swal.fire({
              title: 'Selecciona la hora en la que quieras terminar de trabajar',
              input: 'select',
              inputOptions: {
                  9: '9:00 AM',
                  10: '10:00 AM',
                  11: '11:00 AM',
                  12: '12:00 PM',
                  13: '1:00 PM',
                  14: '2:00 PM',
                  15: '3:00 PM',
                  16: '4:00 PM',
                  17: '5:00 PM',
                  18: '6:00 PM',
                  19: '7:00 PM',
                  20: '8:00 PM',
                  21: '9:00 PM'
              },
              inputPlaceholder: 'Selecciona una hora',
              showCancelButton: true,
              confirmButtonColor: '#1CACA5',
               cancelButtonColor: '#A4A4A4',
               confirmButtonText: 'Listo',
               cancelButtonText: 'Cancelar',
              inputValidator: (value) => {
                return new Promise((resolve) => {
                  if (value !== undefined || null) {
                    resolve()
                  } else {
                    resolve('Necesitas seleccionar una hora')
                  }
                })
              }
            })
            if(hourEnd){
              console.log(userInfo2.stripe);
              let dayExists = userInfo2.stripe.some(item => item.day === day) 
              if (!dayExists) {
                const key = user.key
                const formData = {
                  stripe: [
                    ...userInfo2.stripe,
                    {
                      day: day,
                      start: hourStart,
                      end: hourEnd,
                    }
                  ]
                };
                await editDataUser({ formData, key })
                toast.success('¡Horario creado con exito!')
              } else {
                Swal.fire({
                  
                  title: 'El día seleccionado ya lo tienes ocupado con otro horario diferente.',
                  confirmButtonColor: '#1CACA5',
                  confirmButtonText: 'Listo',
                })
              }
            }
        }
    }
}
  useEffect(() => {
      apiCalendar.handleAuthClick()
     .then(response => {console.log(response)
      setCalendarState(true)
       listAllEvents()
         .then(response2=> {
          const {result} = response2
          console.log(result.items);
          setEvents((prevEvents) => [
            ...prevEvents,
            ...result.items.map((item) => ({
              title: item.summary,
              start: new Date(item.start.dateTime),
              end: new Date(item.end.dateTime),
              id: item.id,
              hangoutLink: item.hangoutLink,
            })),
          ]);
          setHola(true)
        }
          )
    })
   }, [])

   useEffect(() => {
    if(hola){
      setHola2(true)
    }
    console.log(events);
 
   }, [hola])
   
  const handleSelectSlot = (slotInfo) => {
    setInfoEvent(slotInfo)
  };

  const handleSelectEvent = (event) => {
    console.log(event);
   
    setModalEvent(event)
    setOpenModal(true)
  };
  const handleAddStripe = () =>{
    modalAddStripe()
  }

 const handleEditStripe = async (stripe) =>{
  const { value: hourStart } = await Swal.fire({
    title: `Selecciona la hora en la que quieras empezar a trabajar el ${stripe.day}`,
    input: 'select',
    inputOptions: {
        8: '8:00 AM',
        9: '9:00 AM',
        10: '10:00 AM',
        11: '11:00 AM',
        12: '12:00 PM',
        13: '1:00 PM',
        14: '2:00 PM',
        15: '3:00 PM',
        16: '4:00 PM',
        17: '5:00 PM',
        18: '6:00 PM',
        19: '7:00 PM',
        20: '8:00 PM'
    },
    inputPlaceholder: 'Selecciona una hora',
    showCancelButton: true,
    confirmButtonColor: '#1CACA5',
    cancelButtonColor: '#A4A4A4',
    confirmButtonText: 'Listo',
    cancelButtonText: 'Cancelar',
    inputValidator: (value) => {
      return new Promise((resolve) => {
        if (value !== undefined || null) {
          resolve()
        } else {
          resolve('Necesitas seleccionar una hora')
        }
      })
    }
  })
  if (hourStart){  
    const { value: hourEnd } = await Swal.fire({
        title: `Selecciona la hora en la que quieras terminar de trabajar el ${stripe.day}`,
        input: 'select',
        inputOptions: {
            9: '9:00 AM',
            10: '10:00 AM',
            11: '11:00 AM',
            12: '12:00 PM',
            13: '1:00 PM',
            14: '2:00 PM',
            15: '3:00 PM',
            16: '4:00 PM',
            17: '5:00 PM',
            18: '6:00 PM',
            19: '7:00 PM',
            20: '8:00 PM',
            21: '9:00 PM'
        },
        inputPlaceholder: 'Selecciona una hora',
        showCancelButton: true,
        confirmButtonColor: '#1CACA5',
         cancelButtonColor: '#A4A4A4',
         confirmButtonText: 'Listo',
         cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value !== undefined || null) {
              resolve()
            } else {
              resolve('Necesitas seleccionar una hora')
            }
          })
        }
      })
      if(hourEnd){
          const key = user.key
          const newArray = userInfo2.stripe.map(item => {
            if (item.day === stripe.day) {
              return {
                day: stripe.day,
                start: hourStart,
                end: hourEnd,
              };
            }
            return item;
          });
          
          const formData = {
            stripe: newArray,
          };
          await editDataUser({ formData, key })
          toast.success('¡Horario editado con exito!')
      }}

}
 const handleDeleteStripe = async (stripe)=>{
  Swal.fire({
    title: '¿Deseas eliminar la siguiente franja?',
    text: `Los ${stripe.day} de ${stripe.start} a ${stripe.end}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#1CACA5',
    cancelButtonColor: '#c3c3c3',
    confirmButtonText: '¡Si!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      const key = user.key
      const newArray = userInfo2.stripe.filter(item => {
        return item.day !== stripe.day;
      });
      const formData = {
        stripe: newArray,
      };
      await editDataUser({ formData, key })

      toast.success('La franja ha sido eliminada con éxito')
    }
  })
 }

 const cultures = ['en', 'en-GB', 'es', 'fr', 'ar-AE']
 const lang = {
   es: {
     week: 'Semana',
     work_week: 'Semana de trabajo',
     day: 'Día',
     month: 'Mes',
     previous: 'Atrás',
     next: 'Después',
     today: 'Hoy',
     agenda: 'Agenda',
 
     showMore: (total) => `+${total} más`,
   },}
   const { defaultDate, messages } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 1),
      messages: lang[culture],
    }),
    [culture]
  )


  return (
    <main className='CalendarPsycho__father'>
      <HeaderPsycho />
      <Toaster richColors position='top-right'/>
      {hola2 &&
      <div className='CalendarPsycho'>
         <section className='CalendarPsycho__striper'>
           <section>
            <span>Horario</span>   <figure onClick={handleAddStripe}><img src="/Psychologist/plus.svg" alt="plus"/></figure>
           </section>{
            isSuccess &&
           <div>
            {
              userInfo2.stripe.map((item)=>(
                <>
                <h3>{item.day}</h3>
                <article>
                 <figure onClick={()=>handleEditStripe(item)}><img src="/Psychologist/calendar.svg" alt="calendar"/></figure> 
                  <span>{item.start}:00 - {item.end}:00</span>
                  <figure onClick={()=>handleDeleteStripe(item)}><img src="/Psychologist/delete.svg" alt="delete"/></figure> 
                </article>
                </>
              ))
            }
           </div>}
         </section>

        <section>
          <Calendar className='CalendarPsycho__calendar'
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable={true}
            
            culture={culture}
            messages={messages}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
          /></section>
      {
        openModal &&
        <ModalShowEvent  event={modalEvent} close={setOpenModal}/>
      }

      </div>
 }
    </main>
  )
}

export default CalendarPsycho