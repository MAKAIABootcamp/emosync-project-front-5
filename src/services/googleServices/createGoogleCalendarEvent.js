import googleCalendar from "../googleCalendar/googleCalendar";

export const createGoogleCalendarEvent = async (email, eventData) => {
    try {
      // Autentica la solicitud utilizando el objeto googleCalendar
      const auth = await googleCalendar();
  
      // Crea un nuevo evento en Google Calendar
      const response = await google.calendar('v3').events.insert({
        auth: auth,
        calendarId: email, // Utiliza el correo electrónico como ID de calendario
        resource: {
          summary: eventData.title,
          start: eventData.start,
          end: eventData.end,
        },
      });
  
      // El evento ha sido creado exitosamente, y response.data contiene los detalles del evento creado
      return response.data;
    } catch (error) {
      console.error('Error al crear el evento en Google Calendar:', error);
      throw error;
    }
  };