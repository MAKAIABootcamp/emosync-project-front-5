import React, { useEffect, useState } from 'react'
import "./main.scss"
import HeaderPsycho from '../../../components/headerPsycho/HeaderPsycho'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
const localizer = dayjsLocalizer(dayjs)
import apiCalendar, { listAllEvents } from '../../../googleC';
import Loader from '../../../components/loader/Loader'
import ModalShowEvent from '../../../components/modalsPsycho/modalShowEvent/ModalShowEvent'
import { modalAddStripe } from '../../../components/modalsPsycho/modalAddStrype/ModalAddStripe'






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
              id: item.id

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
  const handleSubmit = async (e) => {
    e.preventDefault();

  }

  const handleAddStripe = () =>{
    modalAddStripe()
  }
  return (
    <main className='CalendarPsycho__father'>
      <HeaderPsycho />
      {hola2 &&
      <div className='CalendarPsycho'>
         <section className='CalendarPsycho__striper'>
           <section>
            <span>Horario</span>   <figure onClick={handleAddStripe}><img src="/Psychologist/plus.svg" alt="plus"/></figure>
           </section>
           <div>
            <h3>Lunes</h3>
            <article>
             <figure><img src="/Psychologist/calendar.svg" alt="calendar"/></figure> 
              <span>10:00 am - 12:00 pm </span>
              <figure><img src="/Psychologist/delete.svg" alt="delete"/></figure> 
            </article>
            <article>
             <figure><img src="/Psychologist/calendar.svg" alt="calendar"/></figure> 
              <span>10:00 am - 12:00 pm </span>
              <figure><img src="/Psychologist/delete.svg" alt="delete"/></figure> 
            </article>
            <article>
             <figure><img src="/Psychologist/calendar.svg" alt="calendar"/></figure> 
              <span>10:00 am - 12:00 pm </span>
              <figure><img src="/Psychologist/delete.svg" alt="delete"/></figure> 
            </article>

           </div>
         </section>

        <section>
          <Calendar className='CalendarPsycho__calendar'
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable={true}
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