// Importa la biblioteca googleapis y el objeto googleCalendar
import { google } from 'googleapis';
import googleCalendar from '../googleCalendar/googleCalendar';

// Define una función para obtener los eventos de Google Calendar
export const getGoogleCalendarEvents = async (email) => {
  try {
    // Utiliza el objeto googleCalendar para interactuar con la API de Google Calendar
    const response = await googleCalendar.events.list({
      calendarId: email, // Reemplaza con el ID de tu calendario de Google
    });

    // La variable 'response.data.items' contiene la lista de eventos de Google Calendar
    const googleEvents = response.data.items;

    // Procesa los eventos de Google Calendar como desees

    return googleEvents;
  } catch (error) {
    console.error('Error al obtener eventos de Google Calendar:', error);
    throw error;
  }
};

// Exporta la función para usarla en otros módulos
