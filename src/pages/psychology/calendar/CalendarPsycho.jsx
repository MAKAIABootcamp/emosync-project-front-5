import React, { useState } from 'react'
import "./main.scss"
import HeaderPsycho from '../../../components/headerPsycho/HeaderPsycho'
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
const localizer = dayjsLocalizer(dayjs)
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import ModalEvent from '../../../components/modalCalendarEvent/ModalEvent'

const CalendarPsycho = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [modalPlacement, setModalPlacement] = React.useState("auto");
  const [eventName, setEventName] = useState('');
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
    // Agrega más eventos aquí
  ]);
  const handleSelectSlot = (slotInfo) => {
    // Aquí puedes crear un nuevo evento con la información del slot seleccionado
    //console.log(slotInfo);
    onOpen()
    setInfoEvent(slotInfo)
  };

  const handleEvent = ()=>{
    const newEvent = {
      title: eventName,
      start: infoEvent.start,
      end: infoEvent.end,
    };
    setEvents([...events, newEvent]);
  }

  const handleChangeInput = (e)=>{
  setEventName(e)

  }

  const handleSelectEvent = (event) => {
    // Aquí puedes mostrar la información del evento como desees
    console.log(event);
  };


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
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>

                <Input
                 label="Enter the name of the event"
                 placeholder="Event name"
                 type="text"
                 variant="bordered" onValueChange={(value)=>handleChangeInput(value)}/>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} >
                  Close
                </Button>
                <Button color="primary" onPress={onClose} type='submit' onClick={handleEvent}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    

    </main>
  )
}

export default CalendarPsycho