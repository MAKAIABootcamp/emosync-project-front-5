import React, { useEffect, useState } from 'react'
import "./main.scss"
import HeaderPsycho from '../../../components/headerPsycho/HeaderPsycho'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
const localizer = dayjsLocalizer(dayjs)
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";

//import googleCalendar from '../../../services/googleCalendar/googleCalendar'
//import { getGoogleCalendarEvents } from '../../../services/googleServices/getGoogleCalendar'
//import { createGoogleCalendarEvent } from '../../../services/googleServices/createGoogleCalendarEvent'







const CalendarPsycho = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalPlacement, setModalPlacement] = React.useState("auto");
  const email = 'sebasruiz15@gmail.com'
  const [infoEvent, setInfoEvent] = useState([]);

  const [events, setEvents] = useState([
    {
      title: 'Evento 1',
      start: new Date('2023-09-12T13:45:00-05:00'),
      end: new Date('2023-09-12T14:00:00-05:00')
    },
    {
      title: 'Evento 2',
      start: new Date(2023, 8, 15),
      end: new Date(2023, 8, 16),
    },
  ]);
  // const fetchGoogleCalendarEvents = async () => {
  //   try {
  //     const googleEvents = await getGoogleCalendarEvents(email);
  //     const combinedEvents = [...events, ...googleEvents];
  //     setEvents(combinedEvents);
  //   } catch (error) {
  //     console.error('Error al obtener eventos de Google Calendar en el componente:', error);
  //   }
  // }

  // useEffect(() => {
  //   fetchGoogleCalendarEvents();
  // }, [])



  const handleSelectSlot = (slotInfo) => {

    onOpen()
    setInfoEvent(slotInfo)
  };




  const handleSelectEvent = (event) => {
    console.log(event);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      title: e.target[0].value,
      start: infoEvent.start,
      end: infoEvent.end,
    };
    setEvents([...events, newEvent]);
    // Agrega el nuevo evento a Google Calendar
    // try {
    //   const createdEvent = await createGoogleCalendarEvent(email, newEvent);
    //   // Actualiza el estado de eventos con el nuevo evento
    //   setEvents([...events, createdEvent]);
    // } catch (error) {
    //   console.error('Error al crear el evento en Google Calendar:', error);
    // }
  }
  return (
    <main className='CalendarPsycho__father'>
      <HeaderPsycho />
  
      <div className='CalendarPsycho'>


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
      </div>

      <Modal
        isOpen={isOpen}
        placement={modalPlacement}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit}>
                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                <ModalBody>
                  <Input
                    label="Enter the name of the event"
                    placeholder="Event name"
                    type="text"
                    variant="bordered" />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose} >
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose} type='submit' >
                    Action
                  </Button>

                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>


    </main>
  )
}

export default CalendarPsycho