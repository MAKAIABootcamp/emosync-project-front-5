import ApiCalendar from 'react-google-calendar-api';

const CLIENT_ID =  '82284491588-5s9bn6shgbfb4muc2r2d28sq8c05u9kh.apps.googleusercontent.com'
const API_KEY = 'AIzaSyC4pR20g9P33QzoxmSttCF-K4xQakye3gs'

const config = {
    "clientId": CLIENT_ID,
    "apiKey": API_KEY,
    "scope": "https://www.googleapis.com/auth/calendar",
    "discoveryDocs": [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
    ]
  }
const apiCalendar = new ApiCalendar(config)

export default apiCalendar



const handleItemClick = async (name) => {
    if (name === 'sign-in') {
      const response = await apiCalendar.handleAuthClick();
      console.log(response);
    } else if (name === 'sign-out') {
      const response = apiCalendar.handleSignoutClick();
      console.log(response);
    }
  }






  
  
    //Crear evento
  
    const createAnEvent = async () => {
      try {
        // Define los detalles del evento
        const event = {
          summary: 'Esto es una prueba',
          description: 'Descripción del evento',
          start: {
            dateTime: '2023-09-18T10:00:00',
            timeZone: 'America/Los_Angeles',
          },
          end: {
            dateTime: '2023-09-18T11:00:00',
            timeZone: 'America/Los_Angeles',
          },
          attendees: [
            { email: 'whitneystena418@gmail.com' },
            { email: 'hjimenez.florez@gmail.com' },
          ],
        };
        const response = await apiCalendar.createEventWithVideoConference(event);
        return response
      } catch (error) {
        console.log(error);
      }
  
    }
  
    //Listar todos los eventos
    export const listAllEvents =  async() => {
      const date = new Date();
      const newDate = date.setDate(date.getDate() + 20)
      try {
        const response2 = await apiCalendar.listEvents({
        timeMin: new Date().toISOString(),
        timeMax: new Date(newDate).toISOString(),
        showDeleted: true,
        maxResults: 20,
        orderBy: 'updated'
      });
      return response2
  
    } catch (error) {
      console.log(error)
    }
   }
    // return (
    //   <div>
    //     <button onClick={() => handleItemClick('sign-in')}>Inicio de sesión</button>
    //     <button onClick={() => handleItemClick('sign-out')}>Cierre de sesión</button>
    //     <button onClick={createAnEvent}>Crear evento</button>
    //     <button onClick={listEvents}>Listar eventos</button>
    //   </div>
    // )
  
  
 // export default App